import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button, Card, CardItem, Input, Spinner} from './common';
import firebase from 'react-native-firebase';
class LoginForm extends Component
{
	state = {email:'keval.sublime@gmail.com', password: 'password', error:'', loading: false};
	isLoading()
	{
		if(!this.state.loading)
		{
			return(
				<Button onPress={this.onButtonPress.bind(this)}>
					Login
				</Button>
			);
		}
		else
		{
			return(
				<Spinner size = 'small'/>
			);
		}
	}
	onButtonPress()
	{
		this.setState({error:'', loading: true});
		const {email, password} = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(this.login.bind(this))
		.catch(() => 
		{
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(this.signup.bind(this))
			.catch(() =>
			{
				this.setState({error:'It smells Fishy in here!!', loading:false});
			});
		});
	}
	login()
	{
		this.setState({error:'Welcome.', loading:false})
	}
	signup()
	{
		this.setState({error:'Signed Up!', loading:false})
	}
	render()
	{
		return(
			<Card>
				<CardItem>
					<Input 
						placeholder = 'abc.123@xyz.com'
						label = 'Email ID:'
						autoCorrect = {false}
						value = {this.state.text}
						onChangeText = {email => this.setState({email})}
					/>
				</CardItem>
				
				<CardItem>
					<Input
						placeholder='********'
						label = 'Password:'
						value = {this.state.password}
						onChangeText={password =>this.setState({password})}
						secureTextEntry = {true}
					/>
				</CardItem>
				
				
				<Text style = {styles.errorText}> {this.state.error}</Text>
				
				
				<CardItem>
					{this.isLoading()}
				</CardItem>
			</Card>
		);
	}
}
const styles = 
{
	errorText:
	{
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
}
export default LoginForm;
