import React from 'react'
import Layout from './../Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Game from '../Components/Game';
import History from '../Components/History';

const Routing = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Game />} />
                <Route path='/history' element={<History />} />
            </Routes>
        </Layout>
    )
}

export default Routing
