/*
  Advanced Stats functions
  http://www.basketball-reference.com/about/glossary.html
*/


/*
  Assist Percentage (available since the 1964-65 season in the NBA);
  the formula is 100 * AST / (((MP / (Tm MP / 5)) * Tm FG) - FG).
  Assist percentage is an estimate of the percentage of teammate field goals a
  player assisted while he was on the floor.
  ****************************************************************************
  p(AST, MP, FG) -> Player stats
  t(MP, FG) -> Team stats
*/
export function assistPct(pAST, pMP, pFG, tMP, tFG) {
  return 100 * pAST / (((pMP / (tMP / 5)) * tFG) - pFG);
}

/*
  Block Percentage (available since the 1973-74 season in the NBA);
  the formula is 100 * (BLK * (Tm MP / 5)) / (MP * (Opp FGA - Opp 3PA)).
  Block percentage is an estimate of the percentage of opponent two-point field
  goal attempts blocked by the player while he was on the floor.
  ****************************************************************************
  p(BLK, MP) -> Player stats
  t(MP, FG) -> Team stats
  o(FGA, 3PA) -> Opponent team stats
*/
export function blockPct(pBLK, pMP, tMP, oFGA, o3PA) {
  return 100 * (pBLK * (tMP / 5)) / (pMP * (oFGA - o3PA));
}

/*
  Defensive Rebound Percentage (available since the 1970-71 season in the NBA);
  the formula is 100 * (DRB * (Tm MP / 5)) / (MP * (Tm DRB + Opp ORB)).
  Defensive rebound percentage is an estimate of the percentage of available
  defensive rebounds a player grabbed while he was on the floor.
  ****************************************************************************
  p(DRB, MP) -> Player stats
  t(MP, FG) -> Team stats
  o(ORB) -> Opponent team stats
*/
export function defRebPct(pDRB, pMP, tMP, tDRB, oORB) {
  return 100 * (pDRB * (tMP / 5)) / (pMP * (tDRB + oORB));
}

/*
  The basic building blocks of the Offensive Rating calculation are Individual
  Total Possessions and Individual Points Produced. The formula for Total
  Possessions is broken down into four components: Scoring Possessions,
  Missed FG Possessions, Missed FT Possessions, and Turnovers.

*/
export function offensiveRating(pFGM, pFGA, pPTS, pFTM, pMP, pORB, tMP, tAST, tFGM,
  tFGA, tPTS, tFTM, tFTA, tORB, oORB, oTRB, tTOV) {

  /* Scoring possessions */
  function scPoss() {
    /* Building blocks */
    function fgPart() {
      return pFGM * (1 - 0.5 * ((pPTS - pFTM) / (2 * pFGA)) * qAst());
    }

    function qAst() {
      return ((pMP / (tMP / 5)) * (1.14 * ((tAST - pAST) / tFGM ))) +
        ((((tAST / tMP) * pMP * 5 - pAST) / ((tFGM / tMP) * pMP * 5 - pFGM)) *
        (1 - (pMP / (tMP / 5))));
    }

    function astPart() {
      return 0.5 * (((tPTS - tFTM) - (pPTS - pFTM)) / (2 * (tFGA - pFGA))) * pAST;
    }

    function ftPart() {
      return (1 - Math.pow((1 - (pFTM / pFTA)), 2)) * 0.4 * pFTA;
    }

    function teamScoringPoss() {
      return tFGM + (1 - Math.pow((1 - (tFTM / tFTA)), 2)) * tFTA * 0.4;
    }

    function teamORBWeight() {
      return ((1 - teamORBPct()) * teamPlayPct()) / ((1 - teamORBPct()) * teamPlayPct() +
        teamORBPct() * (1 - teamPlayPct()));
    }

    function teamORBPct() {
      return tORB / (tORB + (oTRB - oORB));
    }

    function teamPlayPct() {
      return teamScoringPoss() / (tFGA + tFTA * 0.4 + tTOV);
    }

    function orbPart() {
      return pORB * teamORBWeight() * teamPlayPct();
    }

    return (fgPart() + astPart() + ftPart()) * (1 - (tORB / teamScoringPoss()) *
      teamORBWeight() * teamPlayPct()) + orbPart();
  }



  /* Missed FG and Missed FT Possessions */
  function fgXPoss() {}

  function ftXPoss() {}

  /* Total Possessions */
  function totalPoss() {}

  /* Individual Points Produced */
  function ptsProduced() {

  }


  return 100 * (ptsProduced() / totalPoss());
}
































/* END */
