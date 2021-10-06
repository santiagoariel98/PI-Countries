export default function validate(inputs){
	let errors = {}

	if(!inputs.name){
		errors.name = "Activity is required";
	} else if (inputs.name.length <= 4){
		errors.name = "Activity is required"
	}
	if(!inputs.season){
		errors.season = "Season is required";
	}
	return errors
}
