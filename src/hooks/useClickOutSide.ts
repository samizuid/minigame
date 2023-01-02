import {FC, useEffect} from 'react'

interface IProps {
    wrapperClass: string
    callback: any
}

export const useClickOutSide: FC<IProps> = ({wrapperClass, callback}) => {
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutSide)
    
        return () => document.removeEventListener('mousedown', handleClickOutSide)
    }, [])

    const handleClickOutSide = (e: any) => {
        const isClickOnExpectedArea = e.target?.closest('.' + wrapperClass)

        if (!isClickOnExpectedArea) {
            callback()
        }
    }

    return null

}
