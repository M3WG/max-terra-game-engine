'use strict'

m3.utility.match = (action) => {
  const center = action.cell,
    cx = 3,
    cy = 3,
    slice = center.map.createSlice(center.getX() - 3, center.getY() - 3, 7, 7)

  const is = (x, y, id) => {
    const cell = slice.getCell(x, y)

    if (!cell) {
      return false
    }

    return cell.tile.getId() == id
  }

  const test = (...tests) => tests.reduce((result, [id, x, y]) => result && is(x, y, id), true)

  const createClaim = (type, ...cells) => m3.model.claim.create({
    cell: cells.map(([id, x, y]) => slice.getCell(x, y)),
    type: m3.model.claimType.createWithId(type),
  })

  /* test a city
    AB
    CD
  */
  //A
  if (test(
    [1, cx, cy],
    [1, cx + 1, cy],
    [1, cx, cy + 1],
    [1, cx + 1, cy + 1]
  )) {
    return createClaim(
      1,
      [1, cx, cy],
      [1, cx + 1, cy],
      [1, cx, cy + 1],
      [1, cx + 1, cy + 1]
    )
  }

  //B
  if (test(
    [1, cx, cy],
    [1, cx - 1, cy],
    [1, cx, cy + 1],
    [1, cx - 1, cy + 1]
  )) {
    return createClaim(
      1,
      [1, cx, cy],
      [1, cx - 1, cy],
      [1, cx, cy + 1],
      [1, cx - 1, cy + 1]
    )
  }

  //C
  if (test(
    [1, cx, cy],
    [1, cx + 1, cy],
    [1, cx, cy - 1],
    [1, cx + 1, cy - 1]
  )) {
    return createClaim(
      1,
      [1, cx, cy],
      [1, cx + 1, cy],
      [1, cx, cy - 1],
      [1, cx + 1, cy - 1]
    )
  }

  //D
  if (test(
    [1, cx, cy],
    [1, cx - 1, cy],
    [1, cx, cy - 1],
    [1, cx - 1, cy - 1]
  )) {
    return createClaim(
      1,
      [1, cx, cy],
      [1, cx - 1, cy],
      [1, cx, cy - 1],
      [1, cx - 1, cy - 1]
    )
  }
  //end of testing city shape

  for (let rotation = 0; rotation < 4; rotation++) {

    /* Mine tests  A
                 B C D */
    // A
    if (test(
      [5, cx, cy],
      [5, cx - 1, cy + 1],
      [5, cx, cy + 1],
      [5, cx + 1, cy + 1]
    )) {
      return createClaim(
        4,
        [5, cx, cy],
        [5, cx - 1, cy + 1],
        [5, cx, cy + 1],
        [5, cx + 1, cy + 1]
      )
    }

    // B
    if (test(
      [5, cx, cy],
      [5, cx + 1, cy - 1],
      [5, cx + 1, cy],
      [5, cx + 2, cy]
    )) {
      return createClaim(
        4,
        [5, cx, cy],
        [5, cx + 1, cy - 1],
        [5, cx + 1, cy],
        [5, cx + 2, cy]
      )
    }

    //C
    if (test(
      [5, cx, cy],
      [5, cx, cy - 1],
      [5, cx - 1, cy],
      [5, cx + 1, cy]
    )) {
      return createClaim(
        4,
        [5, cx, cy],
        [5, cx, cy - 1],
        [5, cx - 1, cy],
        [5, cx + 1, cy]
      )
    }

    //D
    if (test(
      [5, cx, cy],
      [5, cx - 1, cy],
      [5, cx - 1, cy - 1],
      [5, cx - 2, cy]
    )) {
      return createClaim(
        4,
        [5, cx, cy],
        [5, cx - 1, cy],
        [5, cx - 1, cy - 1],
        [5, cx - 2, cy]
      )
    }
    // end of testing mine shape

    for (let flips = 0; flips < 2; flips++) {
      /* Test if a farmstead A B C
                             D
      */
      //A
      if (test(
        [3, cx, cy],
        [3, cx + 1, cy],
        [3, cx + 2, cy],
        [3, cx, cy + 1]
      )) {
        return createClaim(
          2,
          [3, cx, cy],
          [3, cx + 1, cy],
          [3, cx + 2, cy],
          [3, cx, cy + 1]
        )
      }

      //B
      if (test(
        [3, cx, cy],
        [3, cx - 1, cy],
        [3, cx + 1, cy],
        [3, cx - 1, cy + 1]
      )) {
        return createClaim(
          2,
          [3, cx, cy],
          [3, cx - 1, cy],
          [3, cx + 1, cy],
          [3, cx - 1, cy + 1]
        )
      }

      //C
      if (test(
        [3, cx, cy],
        [3, cx - 1, cy],
        [3, cx - 2, cy],
        [3, cx - 2, cy + 1]
      )) {
        return createClaim(
          2,
          [3, cx, cy],
          [3, cx - 1, cy],
          [3, cx - 2, cy],
          [3, cx - 2, cy + 1]
        )
      }

      //D
      if (test(
        [3, cx, cy],
        [3, cx, cy - 1],
        [3, cx + 1, cy - 1],
        [3, cx + 2, cy - 1]
      )) {
        return createClaim(
          2,
          [3, cx, cy],
          [3, cx, cy - 1],
          [3, cx + 1, cy - 1],
          [3, cx + 2, cy - 1]
        )
      }
      // end of testing farmstead shape

      /* Test if a logging camp A B
                                  C D
      */
      //A
      if (test(
        [4, cx, cy],
        [4, cx + 1, cy],
        [4, cx + 1, cy + 1],
        [4, cx + 2, cy + 1]
      )) {
        return createClaim(
          3,
          [4, cx, cy],
          [4, cx + 1, cy],
          [4, cx + 1, cy + 1],
          [4, cx + 2, cy + 1]
        )
      }

      //B
      if (test(
        [4, cx, cy],
        [4, cx - 1, cy],
        [4, cx, cy + 1],
        [4, cx + 1, cy + 1]
      )) {
        return createClaim(
          3,
          [4, cx, cy],
          [4, cx - 1, cy],
          [4, cx, cy + 1],
          [4, cx + 1, cy + 1]
        )
      }

      //C
      if (test(
        [4, cx, cy],
        [4, cx - 1, cy - 1],
        [4, cx, cy - 1],
        [4, cx + 1, cy]
      )) {
        return createClaim(
          3,
          [4, cx, cy],
          [4, cx - 1, cy - 1],
          [4, cx, cy - 1],
          [4, cx + 1, cy]
        )
      }

      //D
      if (test(
        [4, cx, cy],
        [4, cx - 2, cy - 1],
        [4, cx - 1, cy - 1],
        [4, cx - 1, cy]
      )) {
        return createClaim(
          3,
          [4, cx, cy],
          [4, cx - 2, cy - 1],
          [4, cx - 1, cy - 1],
          [4, cx - 1, cy]
        )
      }
      // end of testing logging camp shape

      // End of flips loop. Flip slice.
      slice.flip()
    }

    // End of tests loop. Rotate slice.
    slice.rotate()
  }
}
