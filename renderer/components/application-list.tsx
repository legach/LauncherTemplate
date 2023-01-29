import React, { useEffect } from 'react'
import AppLink from "../../core/domain/applications-link.entity";
import LinkHandler from '../services/LinkHandler';

interface ApplicationListProps {
    applications:AppLink[],
    handler: LinkHandler,
}

const ApplicationList = (props: ApplicationListProps) => {
    
    function getItems(applications:AppLink[]) {
        return applications.map((applications, key) => {
            return (
                <React.Fragment key={++key}>
                    <div className='bg-gray-500 drop-shadow-md rounded-lg p-1.5 w-1/4'>
                        <div>{applications.name}</div>
                        <button className='btn-blue' onClick={() => props.handler.Run(applications)}>Play</button>
                    </div>
                </React.Fragment>
            )
        })
    }

    return (
        <div className='mt-1 w-full flex-wrap flex flex-row gap-x-3 gap-y-2'>
            {getItems(props.applications)}
            
        </div>
    )
}

export default ApplicationList;