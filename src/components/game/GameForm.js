import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, updateGame, getGameById } = useContext(GameContext)

    const [currentGame, setCurrentGame] = useState({
        difficulty: "",
        minPlayers: 0,
        maxPlayers: 0,
        name: "",
        gameTypeId: 0
    })

    const { gameId } = useParams();

    useEffect(() => {
        getGameTypes()
            .then(() => {
                if (gameId) {
                    getGameById(gameId).then(game => {
                        setCurrentGame({
                            difficulty: game.difficulty,
                            minPlayers: game.min_players,
                            maxPlayers: game.max_players,
                            name: game.name,
                            gameTypeId: game.game_type.id,
                            id: gameId
                        })
                    })
                }
            })
    }, [])

    const handleControlledInputChange = (event) => {
        const newGame = { ...currentGame }
        newGame[event.target.name] = event.target.value
        setCurrentGame(newGame)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Title: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <label htmlFor="difficulty">
                    <input type="radio" name="difficulty" className="form-control"
                        value="Easy"
                        checked={currentGame.difficulty === "Easy"}
                        onChange={handleControlledInputChange}
                    />Easy</label>
                <label htmlFor="difficulty">
                    <input type="radio" name="difficulty" className="form-control"
                        value="Moderate"
                        checked={currentGame.difficulty === "Moderate"}
                        onChange={handleControlledInputChange}
                    />Moderate</label>
                <label htmlFor="difficulty">
                    <input type="radio" name="difficulty" className="form-control"
                        value="Difficult"
                        checked={currentGame.difficulty === "Difficult"}
                        onChange={handleControlledInputChange}
                    />Difficult</label>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="minPlayers">Minimum Players: </label>
                    <input type="text" name="minPlayers" required autoFocus className="form-control"
                        value={currentGame.minPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maxPlayers">Maximum Players: </label>
                    <input type="text" name="maxPlayers" required autoFocus className="form-control"
                        value={currentGame.maxPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Type of Game: </label>
                    <select value={currentGame.gameTypeId} name="gameTypeId" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a category</option>
                        {gameTypes.map(gt => (
                            <option key={gt.id} value={gt.id}>
                                {gt.type_name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            {
                gameId
                    ? <button
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()
                            const game = {
                                id: parseInt(gameId),
                                name: currentGame.name,
                                difficulty: currentGame.difficulty,
                                minPlayers: parseInt(currentGame.minPlayers),
                                maxPlayers: parseInt(currentGame.maxPlayers),
                                gameTypeId: parseInt(currentGame.gameTypeId)
                            }

                            // Send POST request to your API
                            updateGame(game)
                                .then(() => history.push("/games"))
                        }}
                        className="btn btn-primary">Edit</button>
                    : <button type="submit"
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
            }
        </form >
    )
}