import styles from "../styles/form.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { useLoginMutation } from "@/services/auth/useLoginMutation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) return alert("Preencha os campos!");


    await loginMutation.mutateAsync({ username, password });
    router.push("/dashboard");
  }

  return (
    <form
      className={styles.formContainer}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Entrando..." : "Login"}
      </button>
      {loginMutation.isError && <p style={{ color: "red" }}>Erro: {loginMutation.error.message}</p>}
    </form>
  );
}
