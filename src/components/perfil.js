import React, { useEffect, useState } from 'react'
import { Card, List, Typography, Input, Button } from '@material-tailwind/react'
import Nbvr from './UI/navbar'
import axios from 'axios'
import { useUser } from './UserContext'
import { toast } from 'react-hot-toast'
import PreLoader1 from './PreLoader1'

export function Perfil() {
	const { user } = useUser()
	const [doctorInfo, setdoctorInfo] = useState(null)
	const [pass, setPass] = useState('')
	const [pass2, setPass2] = useState('')
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}getdoctor/${user.id}`)
			.then((response) => {
				setdoctorInfo(response.data)
			})
			.catch((error) => {
				console.error('Error al cargar los datos del doctor:', error)
			})
	}, [user.id])

	if (!doctorInfo) {
		return <PreLoader1 />
	}

	const registerpatologias = async (e) => {
		e.preventDefault()
		if (pass !== pass2) {
			toast.error('las contraseñas no coinciden.', {
				position: 'top-right'
			})
			return
		}
		try {
			const response = await axios.post(`${process.env.REACT_APP_API_URL}change_password`, {
				iddoctor: user.id,
				newpass: pass2
			})
			if (response.data.message === 'positivo') {
				toast.success('Se cambio la contraseña', {
					position: 'top-right'
				})
			}
			if (response.data.message === 'negativo') {
				toast.error('ocurrio un error', {
					position: 'top-right'
				})
			}
		} catch (error) {
			console.error('Login failed:', error)
			if (error.response) {
				console.error('Respuesta del servidor:', error.response.data)
			}
		}
	}
	return (
		<>
			<Nbvr
				linkto='/panel'
				user={user.username}
				firstlink='/hce'
				firstlabel='Hce'
				secondlink='/panel' ///cambiar
				secondlabel='Perfil'
				thirdlink='/panel' ///cambiar
				thirdlabel='Horarios'
				sexs='visible'
			/>
			<div className='m-4 flex flex-col lg:flex-row gap-4'>
				<Card color='' className='flex-1'>
					<List>
						<Typography variant='h5' color='indigo' className='items-center'>
							Informacion Basica
						</Typography>
						<Typography variant='h7' color='black' className='items-center'>
							Nombres: {doctorInfo.nombre}
						</Typography>
						<Typography variant='h7' color='black' className='items-center'>
							Apellido Paterno: {doctorInfo.apellidoP}
						</Typography>
						<Typography variant='h7' color='black' className='items-center'>
							Apellido Materno: {doctorInfo.ApellidoM}
						</Typography>
						<Typography variant='h7' color='black' className='items-center'>
							Carnet de Identidad: {doctorInfo.ci}
						</Typography>
						<Typography variant='h7' color='black' className='items-center'>
							Correo: {doctorInfo.correo}
						</Typography>
						<Typography variant='h7' color='black' className='items-center'>
							Area: {doctorInfo.area}
						</Typography>
					</List>
				</Card>
				<Card color='' className='flex-1'>
					<List>
						<Typography variant='h5' color='indigo'>
							Cambiar Contraseña
						</Typography>
							<Input
								value={pass}
								onChange={(e) => setPass(e.target.value)}
								label='Contraseña'
								type='password'
							/>
							<Input
								value={pass2}
								onChange={(e) => setPass2(e.target.value)}
								label='Repite Contraseña'
								type='password'
							/>
							<Button onClick={registerpatologias}>Guardar</Button>
					</List>
				</Card>
			</div>
			<div className='m-4 flex flex-col lg:flex-row gap-4'>
				<Card color='' className='flex-1'>
					<List>
						<Typography variant='h5' color='indigo'>
							Cambiar datos del Perfil
						</Typography>
					</List>
				</Card>
			</div>
		</>
	)
}
