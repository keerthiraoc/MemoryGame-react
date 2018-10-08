import React from 'react'
import './main.css'

class Card extends React.Component{
    render() {
		const turned = this.props.isSelected||this.props.didMatch ? 'card flipped' : 'card';
        // const toggleVisible = this.props.didMatch ? 'hidden' : 'visible';
        const toggleVisible = this.props.didMatch?'2px solid green':'2px solid black';

		let style = {
            // visibility: toggleVisible,
            border: toggleVisible, 
            
        };
        return(
            <div className='flip' id={this.props.id} onClick={this.props.handleClick.bind(this)}>
				<div className={turned} style={style}>  
					<div className={`face back`}> </div>
					<div className={`face front ${this.props.className}`}> </div>
				</div>
			</div>
        );
    }
}
export default Card