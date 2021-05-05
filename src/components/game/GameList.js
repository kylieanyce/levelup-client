import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__name">{game.name}</div>
                        <div className="game__players">Players needed: {game.min_players} - {game.max_players}</div>
                        <div className="game__skillLevel">Skill level is {game.difficulty}</div>
                    </section>
                })
            }
        </article>
    )
}