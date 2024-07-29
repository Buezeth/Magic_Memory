import "./SingleCard.css"

export default function SingleCard({card, handleChoice, flipped, disabled}) {


    const handleClick = () => {
        if(!disabled) {
            handleChoice(card)
        }
        // console.log(choiceTwo)
        // choiceTwo && compareChoices()
    }

  return (
    <>
      <div className={flipped ? "card flipped" : "card"}>
            <img src={card.src} alt="card-front" className="card-front" />
            <img src='public/img/cover.png' alt="card-back" className="card-back" onClick={handleClick} />
          </div>
    </>
  )
}
