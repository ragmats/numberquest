import React, { useEffect, useState } from "react";
import GameIcons from "./GameIcons";
import HealthBar from "./HealthBar";

export default function GameImage({
  gameLevels,
  player,
  fellow,
  fellowStartingHealth,
  isEndSubLevel,
  isLastLevel,
  isPreEndLevel,
  beastHealthBar,
  setBeastHealthBar,
  fightHasStarted,
  endGame,
  questLog,
  screenHeight,
  screenWidth,
}) {
  const [imgName, setImgName] = useState("1-1.webp");

  useEffect(() => {
    setImgName(`${player.level}-${player.subLevel}`);
  }, [player.level, player.subLevel]);

  return (
    <div
      className="game-image-container"
      // style={{
      //   backgroundImage: `url("${
      //     import.meta.env.VITE_BASE_URL
      //   }img/tempart/${imgName}.webp")`,
      // }}
    >
      {gameLevels.map((level) => {
        return (
          <React.Fragment key={`${level.level}-${level.subLevel}`}>
            <img
              className="game-image"
              style={
                level.level === player.level &&
                level.subLevel === player.subLevel
                  ? { display: "block" }
                  : { display: "none" }
              }
              src={level.image}
            />
            {/* {console.log(level.image)} */}
          </React.Fragment>
        );
      })}
      {isLastLevel && (player.subLevel === 5 || isPreEndLevel) ? (
        <HealthBar
          character={"beast"}
          name={"The Beast"}
          maxHealth={fellowStartingHealth}
          startHealth={fellow.prevHealth}
          endHealth={fellow.health}
          damageTaken={fellow.damageTaken}
          characterIsVictim={fellow.isVictim}
          healthBar={beastHealthBar}
          setHealthBar={setBeastHealthBar}
          fightHasStarted={fightHasStarted}
          turn={player.guesses.length}
        />
      ) : null}
      <p>Artwork goes here.</p>
      <p>
        Player level {player.level}, Player subLevel {player.subLevel}
      </p>
      <p>The number is {fellow.number}.</p>
      <button onClick={endGame}>Restart</button>
      <GameIcons
        player={player}
        fellow={fellow}
        isLastLevel={isLastLevel}
        questLog={questLog}
        screenHeight={screenHeight}
        screenWidth={screenWidth}
      />
    </div>
  );
}
