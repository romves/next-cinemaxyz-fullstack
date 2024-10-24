import React from 'react'

interface IContainerProps {
    as?: 'div' | 'section' | 'main' | 'header' | 'footer'
    children?: React.ReactNode
}

const Container = ({ as: Tag = 'div', children }: IContainerProps) => {
    return (
        <Tag
            className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'
        >
            {children}
        </Tag>
    )
}

export default Container