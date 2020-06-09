import React from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
    height: 'auto',
    width: '100%',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}
function selectBackgroundColor(isActive, canDrop) {
    if (isActive) {
        return 'darkgreen'
    } else if (canDrop) {
        return 'darkkhaki'
    } else {
        return 'white'
    }
}
const Dustbin = ({ allowedDropEffect }) => {
    const [{ canDrop, isOver, monitor }, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop: () => ({
            name: `${allowedDropEffect} Dustbin`,
            allowedDropEffect,
        }),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            monitor: monitor,
        }),
    })
    const isActive = canDrop && isOver
    const backgroundColor = selectBackgroundColor(isActive, canDrop)
    return (
        <div ref={drop} style={{ ...style, backgroundColor }}>
            {`Works with ${allowedDropEffect} drop effect`}
            <br />
            <br />
            {isActive ? 'Release to drop' : 'Drag a box here'}
            {isActive ? console.log(monitor) : ""}
        </div>
    )
}
export default Dustbin
