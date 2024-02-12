// use-create-user.ts
import { useState } from "react";
import { createUser } from "@/services/users-service";

interface User {
  userId: string;
  dob?: Date;
  ageRange?: string;
  disabilities?: string[];
  language: string;
}

export function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<any>(null);

  const handleCreateUser = async (user: User) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createUser(user);
      setResponse(result);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCreateUser, isLoading, error, response };
}
