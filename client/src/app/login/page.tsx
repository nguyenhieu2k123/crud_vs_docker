"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login } from "@/services/auth"

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
})

const handleSubmit = async (form: any) => {
	await login(form.getValues())

}

export default function Login() {
	const form = useForm({
		resolver: zodResolver(formSchema),
	})
	return (
		<div className="max-w-96 m-auto">
			<Form {...form}>
				<form onSubmit={handleSubmit} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="Email" {...field} />
								</FormControl>
								<FormDescription>
									This is your public display name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder="Password" {...field} />
								</FormControl>
								<FormDescription>
									This is your password
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button onClick={(e) => {
						e.preventDefault()
						handleSubmit(form)
					}}>Submit</Button>
				</form>
			</Form>
		</div>
	)
}
