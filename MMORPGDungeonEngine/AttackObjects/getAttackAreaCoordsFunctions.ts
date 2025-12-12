import { game, UserMoveDirections } from "../gameObject/gameObject";

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
    x:
      attackObjectCoords.topRightXCoord + attackAreaDeep < (game.mapSize - 1) * 8
        ? (game.mapSize - 1) * 8
        : attackObjectCoords.topRightXCoord + attackAreaDeep,
    y: attackObjectCoords.topRightYCoord,
  };

  attackAreaCoord["bottomRightCoords"] = {
    x:
      attackObjectCoords.bottomRightXCoord + attackAreaDeep < (game.mapSize - 1) * 8
        ? (game.mapSize - 1) * 8
        : attackObjectCoords.bottomRightXCoord + attackAreaDeep,
    y: attackObjectCoords.bottomRightYCoord,
  };

  attackAreaCoord["topLeftCoords"] = {
    x: attackObjectCoords.topRightXCoord - 5,
    y: attackObjectCoords.topRightYCoord,
    // x:
    //   attackObjectCoords.topLeftXCoord - attackAreaDeep < 0
    //     ? 0
    //     : attackObjectCoords.topLeftXCoord - attackAreaDeep,
    // y: attackObjectCoords.topLeftYCoord,
  };

  attackAreaCoord["bottomLeftCoords"] = {
    x: attackObjectCoords.bottomRightXCoord - 5,
    y: attackObjectCoords.bottomRightYCoord,
  };
};

export const firstPointIntersection = (
  direction: UserMoveDirections,
  objectID: string,
  attackAreaCoord: {
    [coordName: string]: {
      x: number;
      y: number;
    };
  }
) => {
  if (!game.users[objectID]) {
    return;
  }

  if (direction === UserMoveDirections.up) {
    return (
      game.users[objectID].square.currentCoord.bottomLeft.y > attackAreaCoord["topLeftCoords"].y &&
      game.users[objectID].square.currentCoord.bottomLeft.y <
        attackAreaCoord["bottomLeftCoords"].y &&
      game.users[objectID].square.currentCoord.bottomLeft.x >
        attackAreaCoord["bottomLeftCoords"].x &&
      game.users[objectID].square.currentCoord.bottomLeft.x < attackAreaCoord["bottomRightCoords"].x
    );
  }
  if (direction === UserMoveDirections.down) {
    return (
      game.users[objectID].square.currentCoord.topLeft.y > attackAreaCoord["topLeftCoords"].y &&
      game.users[objectID].square.currentCoord.topLeft.y < attackAreaCoord["bottomLeftCoords"].y &&
      game.users[objectID].square.currentCoord.topLeft.x > attackAreaCoord["bottomLeftCoords"].x &&
      game.users[objectID].square.currentCoord.topLeft.x < attackAreaCoord["bottomRightCoords"].x
    );
  }
  if (direction === UserMoveDirections.left) {
    return (
      game.users[objectID].square.currentCoord.topRight.y > attackAreaCoord["topLeftCoords"].y &&
      game.users[objectID].square.currentCoord.topRight.y < attackAreaCoord["bottomLeftCoords"].y &&
      game.users[objectID].square.currentCoord.topRight.x > attackAreaCoord["bottomLeftCoords"].x &&
      game.users[objectID].square.currentCoord.topRight.x < attackAreaCoord["bottomRightCoords"].x
    );
  }
  if (direction === UserMoveDirections.right) {
    return (
      game.users[objectID].square.currentCoord.topLeft.y > attackAreaCoord["topLeftCoords"].y &&
      game.users[objectID].square.currentCoord.topLeft.y < attackAreaCoord["bottomLeftCoords"].y &&
      game.users[objectID].square.currentCoord.topLeft.x > attackAreaCoord["bottomLeftCoords"].x &&
      game.users[objectID].square.currentCoord.topLeft.x < attackAreaCoord["bottomRightCoords"].x
    );
  }
};

export const secoundPointIntersection = (
  direction: UserMoveDirections,
  objectID: string,
  attackAreaCoord: {
    [coordName: string]: {
      x: number;
      y: number;
    };
  }
) => {
  if (!game.users[objectID]) return;

  if (direction === UserMoveDirections.up) {
    return (
      game.users[objectID].square.currentCoord.bottomRight.y > attackAreaCoord["topLeftCoords"].y &&
      game.users[objectID].square.currentCoord.bottomRight.y <
        attackAreaCoord["bottomLeftCoords"].y &&
      game.users[objectID].square.currentCoord.bottomRight.x >
        attackAreaCoord["bottomLeftCoords"].x &&
      game.users[objectID].square.currentCoord.bottomRight.x <
        attackAreaCoord["bottomRightCoords"].x
    );
  }
  if (direction === UserMoveDirections.down) {
    return (
      game.users[objectID].square.currentCoord.topRight.y > attackAreaCoord["topLeftCoords"].y &&
      game.users[objectID].square.currentCoord.topRight.y < attackAreaCoord["bottomLeftCoords"].y &&
      game.users[objectID].square.currentCoord.topRight.x > attackAreaCoord["bottomLeftCoords"].x &&
      game.users[objectID].square.currentCoord.topRight.x < attackAreaCoord["bottomRightCoords"].x
    );
  }
  if (direction === UserMoveDirections.left) {
    return (
      game.users[objectID].square.currentCoord.bottomRight.y > attackAreaCoord["topLeftCoords"].y &&
      game.users[objectID].square.currentCoord.bottomRight.y <
        attackAreaCoord["bottomLeftCoords"].y &&
      game.users[objectID].square.currentCoord.bottomRight.x >
        attackAreaCoord["bottomLeftCoords"].x &&
      game.users[objectID].square.currentCoord.bottomRight.x <
        attackAreaCoord["bottomRightCoords"].x
    );
  }
  if (direction === UserMoveDirections.right) {
    return (
      game.users[objectID].square.currentCoord.bottomLeft.y > attackAreaCoord["topLeftCoords"].y &&
      game.users[objectID].square.currentCoord.bottomLeft.y <
        attackAreaCoord["bottomLeftCoords"].y &&
      game.users[objectID].square.currentCoord.bottomLeft.x >
        attackAreaCoord["bottomLeftCoords"].x &&
      game.users[objectID].square.currentCoord.bottomLeft.x < attackAreaCoord["bottomRightCoords"].x
    );
  }
};

export const middlePointIntersection = (
  direction: UserMoveDirections,
  objectID: string,
  attackAreaCoord: {
    [coordName: string]: {
      x: number;
      y: number;
    };
  }
) => {
  if (!game.users[objectID]) return;
  if (direction === UserMoveDirections.up) {
    return (
      game.users[objectID].square.currentCoord.bottomLeft.y > attackAreaCoord["topLeftCoords"].y &&
      game.users[objectID].square.currentCoord.bottomLeft.y <
        attackAreaCoord["bottomLeftCoords"].y &&
      Math.floor(
        (game.users[objectID].square.currentCoord.bottomLeft.x +
          game.users[objectID].square.currentCoord.bottomRight.x) /
          2
      ) > attackAreaCoord["topLeftCoords"].x &&
      Math.floor(
        (game.users[objectID].square.currentCoord.bottomLeft.x +
          game.users[objectID].square.currentCoord.bottomRight.x) /
          2
      ) < attackAreaCoord["topRightCoords"].x
    );
  }
  if (direction === UserMoveDirections.down) {
    return (
      game.users[objectID].square.currentCoord.topRight.y > attackAreaCoord["topLeftCoords"].y &&
      game.users[objectID].square.currentCoord.topRight.y < attackAreaCoord["bottomLeftCoords"].y &&
      Math.floor(
        (game.users[objectID].square.currentCoord.topLeft.x +
          game.users[objectID].square.currentCoord.topRight.x) /
          2
      ) > attackAreaCoord["bottomLeftCoords"].x &&
      Math.floor(
        (game.users[objectID].square.currentCoord.topLeft.x +
          game.users[objectID].square.currentCoord.topRight.x) /
          2
      ) < attackAreaCoord["bottomRightCoords"].x
    );
  }
  if (direction === UserMoveDirections.left) {
    return (
      game.users[objectID].square.currentCoord.topRight.y > attackAreaCoord["topLeftCoords"].y &&
      game.users[objectID].square.currentCoord.topRight.y < attackAreaCoord["bottomLeftCoords"].y &&
      Math.floor(
        (game.users[objectID].square.currentCoord.bottomRight.x +
          game.users[objectID].square.currentCoord.topRight.x) /
          2
      ) > attackAreaCoord["bottomLeftCoords"].x &&
      Math.floor(
        (game.users[objectID].square.currentCoord.bottomRight.x +
          game.users[objectID].square.currentCoord.topRight.x) /
          2
      ) < attackAreaCoord["bottomRightCoords"].x
    );
  }
  if (direction === UserMoveDirections.right) {
    return (
      game.users[objectID].square.currentCoord.topLeft.y > attackAreaCoord["topLeftCoords"].y &&
      game.users[objectID].square.currentCoord.topLeft.y < attackAreaCoord["bottomLeftCoords"].y &&
      Math.floor(
        (game.users[objectID].square.currentCoord.bottomLeft.x +
          game.users[objectID].square.currentCoord.topLeft.x) /
          2
      ) > attackAreaCoord["bottomLeftCoords"].x &&
      Math.floor(
        (game.users[objectID].square.currentCoord.bottomLeft.x +
          game.users[objectID].square.currentCoord.topLeft.x) /
          2
      ) < attackAreaCoord["bottomRightCoords"].x
    );
  }
};
