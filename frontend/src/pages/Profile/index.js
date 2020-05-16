import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiArrowLeft, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
    const [people, setPeople] = useState([]);
    const [total, setTotal] = useState(0);

    const history = useHistory();

    const familyId = localStorage.getItem('familyId');
    const familyResponsible_name = localStorage.getItem('familyResponsible_name');
    const name = familyResponsible_name.split(' ');


    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: familyId,
            }
        }).then(Response => {
            setPeople(Response.data);
            setTotal(Response.data.length);
            
        })
    }, [familyId]);

    async function handleDeletePerson(id) {
        try {
            await api.delete(`person/${id}`, {
                headers: {
                    Authorization: familyId,
                }
            });

            setPeople(people.filter(person => person.id !== id));
        } catch (error) {
            alert('Erro ao deletar membro da família.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="ACS Digital" />
                <span>Bem vindo a família de <strong>{name[0]} {name[1]}</strong>.</span>

                <Link className="button" to="person/new">Cadastrar um novo membro</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#0078c8" />
                </button>
            </header>
            <h1>Total de Indivíduos na Família {total}</h1>

            <ul>
                {people.map(person => (
                    <li key={person.id}>


                        <strong>NOME:</strong>
                        <p>{person.name}</p>

                        <strong>GÊNERO:</strong>
                        <p>{person.genre}</p>

                        <strong>DATA DE NASCIMENTO:</strong>
                        <p>{person.birthday}</p>

                        <strong>CARTÃO DO SUS:</strong>
                        <p>{person.sus_card}</p>

                        <strong>TELEFONE:</strong>
                        <p>{person.phone}</p>

                        <strong>CONDIÇÃO DE SAÚDE:</strong>
                        <textarea defaultValue={person.health_condition} />

                        <button onClick={() => handleDeletePerson(person.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
            <Link className="back-link" to="/family">
                <FiArrowLeft size={16} color="#0078c8" />
                        Voltar para Famílias
            </Link>

            <Link className="back-link" to="/person">
                <FiArrowLeft size={16} color="#0078c8" />
                        Voltar para Pessoas
            </Link>
        </div>
    );
}