import React from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { LuInfo } from "react-icons/lu";

const CardComponent = ({ title, amount, tooltip }) => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-wrap justify-center">
                <div className="bg-white shadow-md rounded-lg p-4 m-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">{title}</span>
                        <span className="text-gray-400 cursor-pointer p-2 mb-6" data-tooltip-id={title}><LuInfo  /></span>
                        <Tooltip id={title} place="top" type="dark" effect="solid">
                            {tooltip}
                        </Tooltip>
                    </div>
                    <div className="text-2xl text-green-600">{amount}</div>
                </div>
            </div>
        </div>
    );
};

export default CardComponent;
