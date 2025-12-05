import { game } from "../gameObject/gameObject";

export const getUpAttackAreaCoords = (
  attackObjectCoords: {
    bottomLeftXCoord: number;
    bottomRightXCoord: number;
    topLeftXCoord: number;
    topRightXCoord: number;
    bottomLeftYCoord: number;
    topLeftYCoord: number;
    topRightYCoord: number;
    bottomRightYCoord: number;
  },
  attackAreaDeep: number,
  attackAreaCoord: {
    [coordName: string]: {
      x: number;
      y: number;
    };
  }
) => {
  attackAreaCoord["topLeftCoords"] = {
    x: attackObjectCoords.topLeftXCoord,
    y:
      attackObjectCoords.topLeftYCoord - attackAreaDeep < 0
        ? 0
        : attackObjectCoords.topLeftYCoord - attackAreaDeep,
  };
  attackAreaCoord["topRightCoords"] = {
    x: attackObjectCoords.topRightXCoord,
    y:
      attackObjectCoords.topRightYCoord - attackAreaDeep < 0
        ? 0
        : attackObjectCoords.topRightYCoord - attackAreaDeep,
  };

  attackAreaCoord["bottomLeftCoords"] = {
    x: attackObjectCoords.topLeftXCoord,
    y: attackObjectCoords.topLeftYCoord + 5,
  };

  attackAreaCoord["bottomRightCoords"] = {
    x: attackObjectCoords.topRightXCoord,
    y: attackObjectCoords.topRightYCoord + 5,
  };
};

export const getDownAttackAreaCoords = (
  attackObjectCoords: {
    bottomLeftXCoord: number;
    bottomRightXCoord: number;
    topLeftXCoord: number;
    topRightXCoord: number;
    bottomLeftYCoord: number;
    topLeftYCoord: number;
    topRightYCoord: number;
    bottomRightYCoord: number;
  },
  attackAreaDeep: number,
  attackAreaCoord: {
    [coordName: string]: {
      x: number;
      y: number;
    };
  }
) => {
  attackAreaCoord["topLeftCoords"] = {
    x: attackObjectCoords.bottomLeftXCoord,
    y: attackObjectCoords.bottomLeftYCoord - 5,
  };
  attackAreaCoord["topRightCoords"] = {
    x: attackObjectCoords.bottomLeftXCoord,
    y: attackObjectCoords.bottomLeftYCoord - 5,
  };

  attackAreaCoord["bottomLeftCoords"] = {
    x: attackObjectCoords.bottomLeftXCoord,
    y:
      attackObjectCoords.bottomLeftYCoord + attackAreaDeep > (game.mapSize - 1) * 8
        ? (game.mapSize - 1) * 8
        : attackObjectCoords.bottomLeftYCoord + attackAreaDeep,
  };

  attackAreaCoord["bottomRightCoords"] = {
    x: attackObjectCoords.bottomRightXCoord,
    y:
      attackObjectCoords.bottomRightYCoord + attackAreaDeep > (game.mapSize - 1) * 8
        ? (game.mapSize - 1) * 8
        : attackObjectCoords.bottomRightYCoord + attackAreaDeep,
  };
};

export const getLeftAttackAreaCoords = (
  attackObjectCoords: {
    bottomLeftXCoord: number;
    bottomRightXCoord: number;
    topLeftXCoord: number;
    topRightXCoord: number;
    bottomLeftYCoord: number;
    topLeftYCoord: number;
    topRightYCoord: number;
    bottomRightYCoord: number;
  },
  attackAreaDeep: number,
  attackAreaCoord: {
    [coordName: string]: {
      x: number;
      y: number;
    };
  }
) => {
  attackAreaCoord["topRightCoords"] = {
    x: attackObjectCoords.topLeftXCoord + 5,
    y: attackObjectCoords.topLeftYCoord,
  };

  attackAreaCoord["bottomRightCoords"] = {
    x: attackObjectCoords.bottomLeftXCoord + 5,
    y: attackObjectCoords.bottomLeftYCoord,
  };

  attackAreaCoord["topLeftCoords"] = {
    x:
      attackObjectCoords.topLeftXCoord - attackAreaDeep < 0
        ? 0
        : attackObjectCoords.topLeftXCoord - attackAreaDeep,
    y: attackObjectCoords.topLeftYCoord,
  };

  attackAreaCoord["bottomLeftCoords"] = {
    x:
      attackObjectCoords.bottomLeftXCoord - attackAreaDeep < 0
        ? 0
        : attackObjectCoords.bottomLeftXCoord - attackAreaDeep,
    y: attackObjectCoords.bottomLeftYCoord,
  };
};

export const getRightAttackAreaCoords = (
  attackObjectCoords: {
    bottomLeftXCoord: number;
    bottomRightXCoord: number;
    topLeftXCoord: number;
    topRightXCoord: number;
    bottomLeftYCoord: number;
    topLeftYCoord: number;
    topRightYCoord: number;
    bottomRightYCoord: number;
  },
  attackAreaDeep: number,
  attackAreaCoord: {
    [coordName: string]: {
      x: number;
      y: number;
    };
  }
) => {
  attackAreaCoord["topRightCoords"] = {
    x: attackObjectCoords.topLeftXCoord + 5,
    y: attackObjectCoords.topLeftYCoord,
  };

  attackAreaCoord["bottomRightCoords"] = {
    x: attackObjectCoords.bottomLeftXCoord + 5,
    y: attackObjectCoords.bottomLeftYCoord,
  };

  attackAreaCoord["topLeftCoords"] = {
    x:
      attackObjectCoords.topLeftXCoord - attackAreaDeep < 0
        ? 0
        : attackObjectCoords.topLeftXCoord - attackAreaDeep,
    y: attackObjectCoords.topLeftYCoord,
  };

  attackAreaCoord["bottomLeftCoords"] = {
    x:
      attackObjectCoords.bottomLeftXCoord - attackAreaDeep < 0
        ? 0
        : attackObjectCoords.bottomLeftXCoord - attackAreaDeep,
    y: attackObjectCoords.bottomLeftYCoord,
  };
};
