import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const cardImg = [
    {"src" : "public/img/helmet-1.png", match: false},
    {"src" : "public/img/potion-1.png", match: false},
    {"src" : "public/img/ring-1.png", match: false},
    {"src" : "public/img/scroll-1.png", match: false},
    {"src" : "public/img/shield-1.png", match: false},
    {"src" : "public/img/sword-1.png", match: false}
  ]

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    // console.log(choiceOne)
    // console.log(choiceTwo)
  }

  //Compare Choices
  useEffect(()=> {
    const compareChoices = () => {
      if(choiceOne) {
        setDisabled(true)
      }
      if(choiceOne.src === choiceTwo.src) {
        console.log("Match")
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, match: true}
            } else {
              return card
            }
          })
        })
      }
      else {
        console.log('Not Match')
      }
      setTimeout(() => resetChoice(), 1000);
    }

    choiceTwo && compareChoices()
  }, [choiceTwo, choiceOne])

  useEffect(()=> {
    shufflecards()
  }, [])

  console.log(cards)

  //reser choice
  const resetChoice = () => {
    setTurns(prevTurns => prevTurns + 1)
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
  }


  const shufflecards = () => {
    const shuffleItems = [...cardImg, ...cardImg]
      // .map()
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleItems);
  }

  return (
    <>
      <div>
        <h1>Memory Game</h1>
        <button onClick={shufflecards}>New Game</button>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
          card={card}
          key={card.id} 
          handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.match}
          disabled = {disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </>
  )
}

export default App
