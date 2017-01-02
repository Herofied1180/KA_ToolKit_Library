/* Typedefs:
 * Vector Array: Simply stores a vector as an array, in the format [x, y], which can then be processed by the numerous vector functions in this library.
*/

/* Notes:
 * If you make a branch with revisions on functions, please include those revisions in the @Revision part of the function documentation.
 * Please don't fundamentally change a function when revising it. Your update won't be added. Instead, you could either make another function or conditionally change the output (probably depending on the number of arguments
 * If you add any functions, try to keep the documentation format consistent
*/

/*Changelog:
 * 12/31/16: Initial commit; added: choose, M, B, PM, TB, vectAdd, vectSub, vectDiv, vectMult, vectMag, vectNorm, vectRot, vectMid, vectDist, vectHead, vectRefl. (@maxzman14)
 * 12/31/16: Updated vectRefl; now uses variables instead of calling the same functions multiple times. (@maxzman14)
 * 12/31/16: Bugfixes, added colliding.rectRect, colliding.circleCircle, and colliding.circleLine (@maxzman14)
 * 12/31/16: Pixel art function, bugfixes
 * 12/31/16: horizontalGradient and verticalGradient functions
 * 1/1/17: Fixed colliding.circleCollideLine, TB, and vectRefl
 * 1/1/17: Beginning development of encryption functions
 * 1/1/17: (Hopefully!) completed encryption functions
 * 1/1/17: Trying again! :P
*/
var Kit = {
  canvas: null,//The canvas to apply commands to
  pI: null,//The processing instance to apply the commands with
  programID: null,
  chars: "abcdefghijlkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+[]{}|\\'\":;<,>./?".split(""),
  onKA: (document.location.origin === "https://www.kasandbox.org"),
  localStorage: null,
  init: function(Processing, canvas, ID) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param Processing (Object): The Processing object (from the Processing.js library), passed as an argument so as not to cause errors.
     * @Param canvas (Canvas Element): The canvas for the Toolkit to act on.
     * @Description: Initializes and configures the library
     * @Revisions: None
    */
    if(typeof ID !== "number") { console.log("INVALID ID"); return; }
    Kit.canvas = canvas;
    Kit.pI = new Processing(Kit.canvas);
    Kit.programID = ID;
    Kit.localStorage = localStorage;
  },
  assignKeys: function(reset) {
    if(!Kit.localStorage["keys" + Kit.programID]) {
      Kit.localStorage.setItem("keys" + Kit.programID, "");
    }
    if(!Kit.localStorage["keysAssigned" Kit.programID] || reset) {
      var alphabet = Object.create(Kit.chars);
      while(alphabet.length > 0) {
        var r = Math.floor(Math.random(alphabet.length));
        Kit.localStorage["keys" + Kit.programID] += alphabet[r];
        alphabet.splice(r, 1);
      }
      Kit.localStorage.setItem("keysAssigned" + Kit.programID, true);
    }
  },
  decrypt: function(str) {
    var newStr = "";
    for(var i = 0;i < str.length;i++) {
      for(var j in Kit.localStorage.getItem("keys" + Kit.programID)) {
        if(Kit.localStorage.getItem("keys" + Kit.programID)[j] === str[i]) {
          newStr += Kit.chars[j];
        }
      }
    }
    return newStr;
  },
  encrypt: function(str) {
    var newStr = "";
    for(var i = 0;i < str.length;i++) {
      for(var j in Kit.chars) {
        if(Kit.chars[j] === str[i]) {
          newStr += Kit.storage.get("keys" + Kit.programID)[j];
        }
      }
    }
    return newStr;
  },
  choose: function(choices) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param choices (Array): The array of choices
     * @Returns: A random item from the choices array
     * @Revisions: None
    */
    return choices[Math.floor(Math.random(choices.length))];
  },
  M: function(v1, v2) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Params v1, v2 (Vector Arrays): Two points on the line to find the slope of
     * @Returns (Number): The slope of the line that passes through v1 and v2
     * @Revisions: None
    */
    return (v1[1] - v2[1])/(v1[0] - v2[0]);
  },
  B: function(v1, v2) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Params v1, v2 (Vector Arrays): Two points on the line to find the y intercept of
     * @Returns (Number): The y intercept of the line that passes through v1 and v2
     * @Revisions: None
    */
    return v1[1] - Kit.M(v1, v2) * v1[0];
  },
  PM: function(v1, v2) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Params v1, v2 (Vector Arrays): Two points on the line to find the perpendicular slope of
     * @Returns (Number): The slope of any line perpendicular to the line that passes through v1 and v2
     * @Revisions: None
    */
    return -1/Kit.M(v1, v2);
  },
  TB: function(m, v) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param m (Number): The slope of the line
     * @Param v (Vector Array): A point that the line passes through
     * @Returns (Number): The y intercept of the line that passes through v and has slope m
     * @Revisions:
       * [Bugfix]: Switched order of the parameters
    */
    return v[1] - (m * v[0]);
  },
  vectAdd: function(v1, v2) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Params v1, v2 (Vector Arrays): The two vectors to be added.
     * @Returns (Vector Array): The vector addition of vectors v1 and v2
     * @Revisions: None
    */
    return [v1[0] + v2[0], v1[1] + v2[1]];
  },
  vectSub: function(v, s) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The original vector to be subtracted from
     * @Param s (Vector Array): The vector that will be subtracted from v
     * @Returns (Vector Array): The vector subtraction of v minus s
     * @Revisions: None
    */
    return [v[0] - s[0], v[1] - s[1]];
  },
  vectMult: function(v, m) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The original vector to be multiplied
     * @Param d (Number): The number that the vector is to be multiplied by.
     * @Returns (Vector Array): The vector multiplication of v times m
     * @Revisions: None
    */
    return [v[0] * m, v[1] * m];
  },
  vectDiv: function(v, d) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The original vector to be divided
     * @Param d (Number): The number that the vector is to be divided by.
     * @Returns (Vector Array): The vector division of v over d
     * @Revisions: None
    */
    return [v[0]/d, v[1]/d];
  },
  vectMag: function(v) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The vector to find the magnitude of
     * @Returns (Vector Array): The magnitude of v
     * @Revisions: None
    */
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  },
  vectNorm: function(v) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The vector to be normalized
     * @Returns (Vector Array): The normalized form of v
     * @Revisions: None
    */
    return Kit.vectDiv(v, Kit.vectMag(v));
  },
  vectRot: function(v, t) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The vector to be rotated
     * @Param t (Number): How many degrees/radians to rotate the vector by
     * @Returns (Vector Array): The rotated form of v by t degrees/radians
     * @Revisions: None
    */
    return [v[0] * cos(t) - v[1] * sin(t), v[1] * cos(t) + v[0] * sin(t)];
  },
  vectMid: function(v1, v2) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Params v1, v2 (Vector Arrays): The endpoints of the line to find the midpoint of
     * @Returns (Vector Array): The point exactly between v1 and v2
     * @Revisions: None
    */
    return [v1[0]/2 + v2[0]/2, v1[1]/2 + v2[1]/2];
  },
  vectDist: function(v1, v2) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Params v1, v2 (Vector Arrays): The points to find the distance between
     * @Returns (Number): The distance between v1 and v2
     * @Revisions: None
    */
    return Kit.vectMag(Kit.vectSub(v1, v2));
  },
  vectHead: function(v) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The vector to find the heading of
     * @Returns (Number): The heading of v
     * @Revisions: None
    */
    return atan2(v[1], v[0]);
  },
  vectRefl: function(v, a, b) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The vector to be reflected
     * @Params a, b (Vector Arrays): Two points on the line that v will be reflected over
     * @Returns (Vector Array): v reflected over the line that passes through both a and b
     * @Revisions:  
       * Uses variables rather than calling functions multiple times (12/31/16, @maxzman14)
    */
    var MAB = Kit.M(a, b);
    var BAB = Kit.B(a, b);
    var PMAB = Kit.PM(a, b);
    var TBABV = Kit.TB(PMAB, v);
    return Kit.vectSub(v, Kit.vectMult(Kit.vectSub(v, [(BAB - TBABV)/(PMAB - MAB), MAB * (BAB - TBABV)/(PMAB - MAB) + BAB]), 2));         
  },
  intersection: function(a, b, c, d) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Params a, b (Vector Arrays): Two points on the first line to find the intersection point of
     * @Params c, d (Vector Arrays): Two points on the second line to find the intersection point of
     * @Returns (Vector Array): The intersection point of the two lines
     * @Revisions: None
    */
    var X = (Kit.B(c, d) - Kit.B(a, b))/(Kit.M(a, b) - Kit.M(c, d));
    return [X, Kit.M(a, b) * X + Kit.B(a, b)];
  },
  pixelArt: function(data, colors, w, h) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param data (2D Array): The data that the pixel art uses
     * @Colors (Object): Matches each key with a color
     * @Params w, h (Numbers): Width and height of the image respectively. Both default to 120.
     * @Returns (Image): A new image with the pixel art drawn on it
     * @Revisions: 
       * Removed stroke from pixels (12/31/16, @maxzman14)
    */
    var img = Kit.pI.createGraphics(w || 120, h || 120, 1);
    img.background(0, 0, 0, 0);
    img.noStroke();
    
    var longestRow = 0;
    for(var y = 0;y < data.length;y++) {
      if(data[y].length > longestRow) {
        longestRow = data[y].length;
      }
    }
    
    for(var y = 0;y < data.length;y++) {
      for(var x = 0;x < data[y].length;x++) {
        if(colors[data[y][x]] !== undefined) {
          img.fill(colors[data[y][x]]);
          img.rect(x * img.width/longestRow, y * img.height/data.length, img.width/longestRow, img.height/data.length);
        }
      }
    }
    
    return img.get();
  },
  verticalGradient: function(img, x, y, w, h, c1, c2, quality) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param img (Image): The image to draw the gradient onto
     * @Param x (Number): x position of the gradient
     * @Param y (Number): y position of the gradient
     * @Param w (Number): width of the gradient
     * @Param h (Number): height of the gradient
     * @Params c1, c2 (Colors): The top and bottom colors, respectively
     * @Param quality (Number): Lower = more quality. 2 is typically good
     * @Revisions:
       * Fixed strokeWeight (12/31/16, @maxzman14)
    */
    img.strokeWeight(quality);
    for(var sy = 0;sy <= h;sy += quality) {
      img.stroke(Kit.pI.lerpColor(c1, c2, sy/w));
      img.line(x, y + sy, x + w, y + sy);
    }
  },
  horizontalGradient: function(img, x, y, w, h, c1, c2, quality) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param img (Image): The image to draw the gradient onto
     * @Param x (Number): x position of the gradient
     * @Param y (Number): y position of the gradient
     * @Param w (Number): width of the gradient
     * @Param h (Number): height of the gradient
     * @Params c1, c2 (Colors): The top and bottom colors, respectively
     * @Param quality (Number): Lower = more quality. 2 is typically good
     * @Revisions:
       * Fixed strokeweight
    */
    img.strokeWeight(quality);
    for(var sx = 0;sx <= w;sx += quality) {
      img.stroke(Kit.pI.lerpColor(c1, c2, sx/w));
      img.line(x + sx, y, x + sx, y + h);
    }
  },
  colliding: {
    /* This contains all collision check functions between shapes */
    circleCircle: function(p1, r1, p2, r2) {
      /* @Author: TemporalFuzz (@maxzman14)
       * @Params p1, p2 (Vector Arrays): The positions of the two circles
       * @Params r1, r2 (Numbers): The radii of each circle
       * @Returns (Boolean): Whether the two given circles are colliding
       * @Revisions: None
      */
      return Kit.vectDist(p1, p2) < r1 + r2;
    },
    rectRect: function(x1, y1, w1, h1, x2, y2, w2, h2) {
      /* @Author: TemporalFuzz (@maxzman14)
       * @Params x1, x2 (Numbers): The x positions of the center of each rectangle
       * @Params y1, y2 (Numbers): The y positions of the center of each rectangle
       * @Params w1, w2 (Numbers): The widths of each rectangle
       * @Params h1, h2 (Numbers): The heights of each rectangle
       * @Returns (Boolean): Whether the two rectangles are colliding
       * @Revisions: None
      */
      return abs(x1 - x2) * 2 < w1 + w2 && abs(y1 - y2) * 2 < h1 + h2;
    },
    circleLine: function(a, b, c, r) {
      /* @Author: TemporalFuzz (@maxzman14)
       * @Params a, b (Vector Arrays): The endpoints of the segment
       * @Param c (Vector Array): The center of the circle
       * @Param r (Number): The radius of the circle
       * @Returns (Boolean): Whether the specified segment is colliding with the speficied circle
       * @Revisions: None
      */
      if(c[0] < Math.min(a[0], b[0]) - r) { return false; }
      if(c[0] > Math.max(a[0], b[0]) + r) { return false; }
      if(c[1] < Math.min(a[1], b[1]) - r) { return false; }
      if(c[1] > Math.max(a[1], b[1]) + r) { return false; }
      if(a[0] === b[0] || a[1] === b[1]) { return false; }
      
      if(Kit.vectDist(a, c) < r || Kit.vectDist(b, c) < r) { return true; }
      
      var m = (Kit.B(a, b) - Kit.TB(Kit.PM(a, b), c))/(Kit.PM(a, b) - Kit.M(a, b));
      return m > Math.min(a[0], b[0]) && m < Math.max(a[0], b[0]) && Kit.vectDist([m, Kit.M(a, b) * m + Kit.B(a, b)], c) < r;
    },
    lineLine: function(a, b, c, d) {
      /* @Author: TemporalFuzz (@maxzman14)
       * @Params a, b (Vector Arrays): The two endpoints of the first line to check the intersection of
       * @Params c, d (Vector Arrays): The two endpoints of the second line to check the intersection of
       * @Returns (Vector Array): The intersection point of the two lines
       * @Revisions: None
      */
      var p = Kit.intersection(a, b, c, d);//Calculate intersection
      return (p[0] >= Math.min(a[0], b[0]) && p[0] <= Math.max(a[0], b[0]) && p[0] >= Math.min(c[0], d[0]) && p[0] <= Math.max(c[0], d[0]));
    }
  },
  storage: {
    set: function (item, value) {
      Kit.localStorage.setItem(item, value);
    },
    get: function (item) {
      return Kit.localStorage.getItem(item);
    },
    delete: function(item) {
      Kit.localStorage.removeItem(item);
    },
  }
};
