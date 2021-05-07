import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    const [currentGame, setCurrentGame] = useState({
        difficulty: 1,
        minPlayers: 0,
        maxPlayers: 0,
        name: "",
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes()
    }, [])

    const handleControlledInputChange = (event) => {
        const newGame = { ...currentGame }
        newGame[event.target.id] = event.target.value
        setCurrentGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Title: </label>
                    <input type="text" id="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="difficulty">Difficulty (1 is easy and 5 is difficult): </label>
                    <input type="text" id="difficulty" required autoFocus className="form-control"
                        value={currentGame.difficulty}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="minPlayers">Minimum Players: </label>
                    <input type="text" id="minPlayers" required autoFocus className="form-control"
                        value={currentGame.minPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maxPlayers">Maximum Players: </label>
                    <input type="text" id="maxPlayers" required autoFocus className="form-control"
                        value={currentGame.maxPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Type of Game: </label>
                    <select value={currentGame.gameTypeId} id="gameTypeId" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a category</option>
                        {gameTypes.map(gt => (
                            <option key={gt.id} value={gt.id}>
                                {gt.type_name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        name: currentGame.name,
                        difficulty: parseInt(currentGame.difficulty),
                        minPlayers: parseInt(currentGame.minPlayers),
                        maxPlayers: parseInt(currentGame.maxPlayers),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}