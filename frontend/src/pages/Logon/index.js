/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import acsImg from '../../assets/acs.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();


    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            
            localStorage.setItem('familyId',id);
            localStorage.setItem('familyResponsible_name',response.data.responsible_name);

            history.push('/profile');
        } catch (error) {
            alert('Falha no login, tente novamente.');
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="ACS Digital" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input placeholder="🔑 Família ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">👪 Entrar</button>

                    <Link className="back-link" to="/family">
                        <FiLogIn size={16} color="#0078c8" />
                        Listar Todas as Famílias
                    </Link>

                    <Link className="back-link" to="/person">
                        <FiLogIn size={16} color="#0078c8" />
                        Listar Todas as Pessoas
                    </Link>

                </form>
            </section>
            <img src={acsImg} alt="acs" />
        </div>
    );
}