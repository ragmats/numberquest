export default function GameText({
  level,
  player,
  fellow,
  announcer,
  isLastLevel,
  isPreEndLevel,
}) {
  return (
    <>
      <div className="game-text">
        {/* The following dangerouslySetInnerHTML is always from a known source */}
        {fellow.response || announcer.hasAnnouncement ? (
          <>
            {isLastLevel ? (
              <>
                {announcer.reaction ? (
                  <p dangerouslySetInnerHTML={{ __html: announcer.reaction }} />
                ) : null}
                {announcer.description ? (
                  <p
                    dangerouslySetInnerHTML={{ __html: announcer.description }}
                  />
                ) : null}
                {announcer.suggestion ? (
                  <p
                    dangerouslySetInnerHTML={{ __html: announcer.suggestion }}
                  />
                ) : null}
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
              <p dangerouslySetInnerHTML={{ __html: announcer.description }} />
            ) : (
              <p dangerouslySetInnerHTML={{ __html: level.text1 }} />
            )}
            <p dangerouslySetInnerHTML={{ __html: level.text2 }} />
            {level.text3 ? (
              <p dangerouslySetInnerHTML={{ __html: level.text3 }} />
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
