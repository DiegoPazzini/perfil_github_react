import { useState, useEffect } from 'react';
import styles from './ReposList.module.css'

const ReposList = ({ repos }) => {
    
    return (
        <div className='container'>
            <ul className={styles.list}>
                {/* {repos.map(repositorio => (  // para todo o repositório, mas podemos fazer uma desestruração: */}
                {repos.map(({id, name, language, html_url}) => (
                    <li className={styles.listItem} key={id}>
                        <div className={styles.listItemName}>
                            <b>Nome:</b>
                            {name}
                        </div>
                        <div className={styles.listItemLanguage}>
                            <b>Linguagem:</b>
                            {language}
                        </div>
                        <a className={styles.listItemLink} target="_blank" href={html_url}>Visitar no Github</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ReposList;