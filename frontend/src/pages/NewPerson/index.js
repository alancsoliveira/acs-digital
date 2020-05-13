import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewPerson() {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [birthday, setBirthday] = useState('');
    const [sus_card, setSus_card] = useState('');
    const [health_condition, setHealth_condition] = useState('');
    const [phone, setPhone] = useState('');

    const history = useHistory();

    const familyId = localStorage.getItem('familyId')

    async function handleNewPerson(e) {
        e.preventDefault();

        const data = {
            name,
            genre,
            birthday,
            sus_card,
            health_condition,
            phone,
        };
        if (data.name === '' || data.genre === '' || data.birthday === '' || data.sus_card === '' || data.health_condition === '' || data.phone === '') {
            alert('Preencha todos os campos para continuar!')
        }
        else if (data.name[0] === ' ') {
            alert('Nome não pode começar com espaços em branco')
        }
        else {
            try {

                await api.post('person', data, {
                    headers: {
                        Authorization: familyId,
                    }
                })

                history.push('/profile');
            } catch (error) {
                alert('Erro ao cadastrar um novo membro, tente novamente.')

            }
        }
    }

    return (
        <div className="new-person-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="ACS Digital" />

                    <h1>Cadastrar um membro</h1>
                    <p>Faça o cadastro de novos membros para essa família.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#0078c8" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewPerson}>
                    <input
                        placeholder="Nome completo"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        placeholder="Gênero"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                    />

                    <input
                        placeholder="Data de Nascimento"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                    />

                    <input
                        placeholder="Cartão do SUS"
                        value={sus_card}
                        onChange={e => setSus_card(e.target.value)}
                    />

                    <input
                        placeholder="Telefone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />

                    <textarea
                        placeholder="Condição de saúde"
                        value={health_condition}
                        onChange={e => setHealth_condition(e.target.value)}
                    />


                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}