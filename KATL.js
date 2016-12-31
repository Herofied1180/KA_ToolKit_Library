/* Typedefs:
 * Vector Array [x, y]: Simply stores a vector, which can be processed by the numerous vector functions in this library.
*/

/* Notes:
 * If you make a branch with revisions on functions, please include those revisions in the @Revision part of the function documentation.
 * Please don't fundamentally change a function when revising it. Your update won't be added. Instead, you could either make another function or conditionally change the output (probably depending on the number of arguments)
*/

/*Changelog:
 * 12/31/16: Initial release; added: choose, M, B, PM, TB, vectAdd, vectSub, vectDiv, vectMult, vectMag, vectNorm, vectRot, vectMid, vectDist, vectHead, vectRefl. (@maxzman14)
 * 12/31/16: Updated vectRefl; now uses variables instead of calling the same functions multiple times. (@maxzman14)
*/

var Kit = {
  onKA: (document.location.origin === "https://www.kasandbox.org"),
  choose: function(choices) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param choices (Array): The array of choices
     * @Returns: A random item from the choices array
     * @Revisions: None
    */
    return choices[floor(random(choices.length))];
  },
  M: function(v1, v2) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Params v1, v2 (Vector Arrays): Two points on the line to find the slope of
     * @Returns: The slope of the line that passes through v1 and v2
     * @Revisions: None
    */
    return (v1[1] - v2[1])/(v1[0] - v2[0]);
  },
  B: function(v1, v2) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Params v1, v2 (Vector Arrays): Two points on the line to find the y intercept of
     * @Returns: The y intercept of the line that passes through v1 and v2
     * @Revisions: None
    */
    return v1[1] - M(v1, v2) * v1[0];
  },
  PM: function(v1, v2) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Params v1, v2 (Vector Arrays): Two points on the line to find the perpendicular slope of
     * @Returns: The slope of any line perpendicular to the line that passes through v1 and v2
     * @Revisions: None
    */
    return -1/M(v1, v2);
  },
  TB: function(v, m) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): A point that the line passes through
     * @Param m (Number): The slope of the line
     * @Returns: The y intercept of the line that passes through v and has slope m
     * @Revisions: None
    */
    return v[1] - (m * v[0]);
  },
  vectAdd: function(v1, v2) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Params v1, v2 (Vector Arrays): The two vectors to be added.
     * @Returns: The vector addition of vectors v1 and v2
     * @Revisions: None
    */
    return [v1[0] + v2[0], v1[1] + v2[1]];
  },
  vectSub: function(v, s) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The original vector to be subtracted from
     * @Param s (Vector Array): The vector that will be subtracted from v
     * @Returns: The vector subtraction of v minus s
     * @Revisions: None
    */
    return [v[0] - s[0], v[1] - s[1]];
  },
  vectMult: function(v, m) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The original vector to be multiplied
     * @Param d (Number): The number that the vector is to be multiplied by.
     * @Returns: The vector multiplication of v times m
     * @Revisions: None
    */
    return [v[0] * m, v[1] * m];
  },
  vectDiv: function(v, d) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The original vector to be divided
     * @Param d (Number): The number that the vector is to be divided by.
     * @Returns: The vector division of v over d
     * @Revisions: None
    */
    return [v[0]/d, v[1]/d];
  },
  vectMag: function(v) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The vector to find the magnitude of
     * @Returns: The magnitude of v
     * @Revisions: None
    */
    return sqrt(v[0] * v[0] + v[1] * v[1]);
  },
  vectNorm: function(v) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The vector to be normalized
     * @Returns: The normalized form of v
     * @Revisions: None
    */
    return TK.vectDiv(v, TK.vectMag(v));
  },
  vectRot: function(v, t) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The vector to be rotated
     * @Param t (Number): How many degrees/radians to rotate the vector by
     * @Returns: The rotated form of v by t degrees/radians
     * @Revisions: None
    */
    return [v[0] * cos(t) - v[1] * sin(t), v[1] * cos(t) + v[0] * sin(t)];
  },
  vectMid: function(v1, v2) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Params v1, v2 (Vector Arrays): The endpoints of the line to find the midpoint of
     * @Returns: The point exactly between v1 and v2
     * @Revisions: None
    */
    return [v1[0]/2 + v2[0]/2, v1[1]/2 + v2[1]/2];
  },
  vectDist: function(v1, v2) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Params v1, v2 (Vector Arrays): The points to find the distance between
     * @Returns: The distance between v1 and v2
     * @Revisions: None
    */
    return TK.vectMag(TK.vectSub(v1, v2));
  },
  vectHead: function(v) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The vector to find the heading of
     * @Returns: The heading of v
     * @Revisions: None
    */
    return atan2(v[1], v[0]);
  },
  vectRefl: function(v, a, b) {
    /* @Author: TemporalFuzz (@maxzman14)
     * @Param v (Vector Array): The vector to be reflected
     * @Params a, b (Vector Arrays): Two points on the line that v will be reflected over
     * @Returns: v reflected over the line that passes through both a and b
     * @Revisions:  
       * Uses variables rather than calling functions multiple times (12/31/16, @maxzman14)
    */
    var MAB = TK.M(a, b);
    var BAB = TK.B(a, b);
    var PMAB = TK.PM(a, b);
    var TBABV = TK.TB(PMAB, v);
    return TK.vectSub(v, TK.vectMult(TK.vectSub(v, [(BAB - TBABV)/(PMAB - MAB), MAB * (BAB - TBABV)/(PMAB - MAB) + BAB]), 2_);         
  }
};
