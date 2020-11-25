import React, { useEffect, useState } from 'react';

import { Loader } from 'rsuite';

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';

import './styles.css';

const SellingGraph = ({ data }) => {

    const [newData, setNewData] = useState({});
    const [loading, setLoading] = useState(true);

    const colors = ["#1f77b4", "#2ca02c", "#d62728"];

    const refiningData = (data) => {
        setLoading(true);

        let games = 0;
        let store = 0;
        let streaming = 0;

        data.map(e => {
            if (e.category === 'games') {
                games += e.selling_qtt;
            } else if (e.category === 'store') {
                store += e.selling_qtt;
            } else {
                streaming += e.selling_qtt;
            }
        });

        const aux = [
            {
                category: 'Jogos',
                selling_qtt: games,
            },
            {
                category: 'Lojas',
                selling_qtt: store,
            },
            {
                category: 'Streaming',
                selling_qtt: streaming,
            },
        ]

        setLoading(false);
        return aux;
    }

    useEffect(() => {
        setNewData(refiningData(data));
    }, [])

    const CustomTooltip = ({ active, payload }) => {
        if (active) {
            return (
                <div className="main-custom-tooltip">
                    <p className="custom-title">{payload[0].payload.category}</p>
                    <p>Quantidade vendida: <span className="custom-tooltip-selling">{payload[0].payload.selling_qtt}</span></p>
                </div>
            );
        }

        return null
    }

    return (
        <div className="main-graph-selling">

            {loading ? <Loader></Loader> :
                <BarChart width={900} height={400} data={newData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />

                    <Bar dataKey="selling_qtt" >
                        {
                            newData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index]} />
                            ))
                        }
                    </Bar>
                </BarChart>
            }
        </div>
    );
}

export default SellingGraph;