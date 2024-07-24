export default function GameText({
  level,
  player,
  fellow,
  announcer,
  isLastLevel,
  isPreEndLevel,
}) {
  return (
    <div className="game-text">
      {fellow.response || announcer.hasAnnouncement ? (
        <>
          {isLastLevel ? (
            <>
              {announcer.reaction ? <p>{announcer.reaction}</p> : null}
              {announcer.description ? <p>{announcer.description}</p> : null}
              {announcer.suggestion ? <p>{announcer.suggestion}</p> : null}
            </>
          ) : (
            <p>{fellow.response}</p>
          )}
        </>
      ) : (
        <>
          {announcer.lastDescription &&
          isPreEndLevel &&
          player.guess !== fellow.number ? (
            <p>{announcer.lastDescription}</p>
          ) : (
            <p>{level.text1}</p>
          )}
          <p>{level.text2}</p>
          {level.text3 ? <p>{level.text3}</p> : null}
        </>
      )}
    </div>
  );
}
