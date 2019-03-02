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

  for (let rotation = 0; rotation < 4; rotation++) {

    /* test a city
      AB
      CD
    */
    //A
    if (is(cx, cy, 1)) {
      if (is(cx + 1, cy, 1)) {
        if (is(cx, cy + 1, 1)) {
          if (is(cx + 1, cy + 1, 1)) {
            return 'city A'

            // TODO: return matched cells
            /*
            return [
              slice.getCell(cx, cy),
              slice.getCell(cx + 1, cy),
              slice.getCell(cx, cy + 1),
              slice.getCell(cx + 1, cy + 1),
            ]
            */
          }
        }
      }
    }

    //B
    if (is(cx, cy, 1)) {
      if (is(cx - 1, cy, 1)) {
        if (is(cx, cy + 1, 1)) {
          if (is(cx - 1, cy + 1, 1)) {
            return 'city B'
          }
        }
      }
    }

    //C
    if (is(cx, cy, 1)) {
      if (is(cx + 1, cy, 1)) {
        if (is(cx, cy - 1, 1)) {
          if (is(cx + 1, cy - 1, 1)) {
            return 'city C'
          }
        }
      }
    }

    //D
    if (is(cx, cy, 1)) {
      if (is(cx - 1, cy, 1)) {
        if (is(cx, cy - 1, 1)) {
          if (is(cx - 1, cy - 1, 1)) {
            return 'city D'
          }
        }
      }
    } //end of testing city shape

    /* Mine tests  A
                 B C D */
    // Assuming center tile is A
    if(is(cx, cy, 5)){
      if(is(cx-1, cy+1, 5)){
    	   if(is(cx, cy+1,5 )){
    	      if(is(cx+1,cy+1,5)){
    		        return 'mine A'
            }
          }
        }
      }

    // B
    if(is(cx+1, cy-1, 5)){
      if(is(cx, cy, 5)){
    	   if(is(cx+1, cy, 5)){
    	      if(is(cx+2, cy, 5)){
    	         return 'mine B'
    	      }
    	    }
        }
      }
    //C
    if(is(cx, cy-1, 5)){
      if(is(cx-1, cy, 5)){
    	   if(is(cx, cy, 5)){
    	      if(is(cx+1, cy, 5)){
    		        return 'mine C'
    	      }
         }
      }
    }
    //D
    if(is(cx-1, cy-1, 5)){
      if(is(cx-2, cy, 5)){
    	   if(is(cx-1, cy, 5)){
    	      if(is(cx, cy, 5)){
    		        return 'mine D'
              }
            }
          }
        } // end of testing mine shape

    for (let flips = 0; flips < 2; flips++) {
      /* Test if a farmstead A B C
                             D
      */
      //A
      if (is(cx, cy, 3)) {
        if (is(cx + 1, cy, 3)) {
          if (is(cx +2, cy, 3)) {
            if (is(cx, cy + 1, 3)) {
              return 'farmstead A'
            }
          }
        }
      }
      //B
      if (is(cx, cy, 3)) {
        if (is(cx - 1, cy, 3)) {
          if (is(cx +1, cy, 3)) {
            if (is(cx - 1, cy + 1, 3)) {
              return 'farmstead B'
            }
          }
        }
      }
      //C
      if (is(cx, cy, 3)) {
        if (is(cx - 1, cy, 3)) {
          if (is(cx - 2, cy, 3)) {
            if (is(cx - 2, cy + 1, 3)) {
              return 'farmstead C'
            }
          }
        }
      }
      //D
      if (is(cx, cy, 3)) {
        if (is(cx, cy - 1, 3)) {
          if (is(cx + 1, cy - 1, 3)) {
            if (is(cx + 2, cy - 1, 3)) {
              return 'farmstead D'
            }
          }
        }
      }

      /* Test if a logging camp A B
                                  C D
      */
      //A
      if (is(cx, cy, 4)) {
        if (is(cx + 1, cy, 4)) {
          if (is(cx + 1, cy + 1, 4)) {
            if (is(cx + 2, cy + 1, 4)) {
              return 'logging camp A'
            }
          }
        }
      }
      //B
      if (is(cx, cy, 4)) {
        if (is(cx - 1, cy, 4)) {
          if (is(cx, cy + 1, 4)) {
            if (is(cx + 1, cy + 1, 4)) {
              return 'logging camp B'
            }
          }
        }
      }
      //C
      if (is(cx, cy, 4)) {
        if (is(cx - 1, cy - 1, 4)) {
          if (is(cx, cy - 1, 4)) {
            if (is(cx + 1, cy, 4)) {
              return 'logging camp C'
            }
          }
        }
      }
      //D
      if (is(cx, cy, 4)) {
        if (is(cx - 2, cy - 1, 4)) {
          if (is(cx - 1, cy - 1, 4)) {
            if (is(cx - 1, cy, 4)) {
              return 'logging camp D'
            }
          }
        }
      }

      // End of flips loop. Flip slice.
      slice.flip()
    }

    // End of tests loop. Rotate slice.
    slice.rotate()
  }
}
