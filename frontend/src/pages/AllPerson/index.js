import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower, FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';

export default function AllFamily() {
    const [people, SetPeople] = useState([]);
    const [total, setTotal]= useState(0);

    const history = useHistory();

    const personId = localStorage.getItem('personId');

    useEffect(() => {
        api.get('person').then(Response => {
            SetPeople(Response.data);
            setTotal(Response.data.length)
        })
    }, [personId]);

    async function handleLoginPerson(id) {

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('familyId', id);
            localStorage.setItem('familyResponsible_name', response.data.responsible_name);

            history.push('/profile');
        } catch (error) {
            alert('Falha no login, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/')
    }

    return (
        <div className="all-person-container">
            <header>
                <img src={logoImg} alt="ACS Digital" />
                <span>Esse menu lista todas <strong>pessoas</strong> cadastradas!</span>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#0078c8" />
                </button>
            </header>
            <h1>Total de Pessoas Encontradas: {total}</h1>

            <ul>
                {people.map(person => (
                    <li key={person.person_id}>


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



                        <button onClick={() => handleLoginPerson(person.family_id)} type="button">
                            <FiLogIn size={20} color="#0078c8" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}