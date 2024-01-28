// register.tsx
import { auth } from "@/pages/auth/firebase"
import { registerSchema } from "@/pages/auth/register"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const Register = () => {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: { email: string; password: string }) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        navigate("/")

        // Redirige o maneja el estado del usuario aquí
      })
      .catch((error) => {
        console.error(error.message)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  )
}
