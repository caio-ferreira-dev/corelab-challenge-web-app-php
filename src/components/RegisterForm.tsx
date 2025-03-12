import styles from "../styles/form.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRegisterMutation } from "@/services/auth/useRegisterMutation";

export default function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const registerMutation = useRegisterMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) return alert("Preencha os campos!");
    if (password !== passwordConfirm)
      return alert("As senha não correspondem!");

    await registerMutation.mutateAsync({ username, password });
    router.push("/login"); // Redireciona ao sucesso
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
      <input
        type="password"
        placeholder="Confirmar Senha"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <button type="submit" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? "Registrando..." : "Registrar"}
      </button>
      {registerMutation.isError && (
        <p style={{ color: "red" }}>Erro: {registerMutation.error.message}</p>
      )}
    </form>
  );
}
