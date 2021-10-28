import React from "react"

export function MsgComplete({setComplete}){
	return(
		<div className="msg">
			<div className="msg-background"></div>
			<div className="msg-text">
				<span className="btn-close" onClick={()=>setComplete(false)}>X</span>			
				<p>Activity created successfully</p>			
			</div>
			</div>
		)
}