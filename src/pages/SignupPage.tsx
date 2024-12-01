import { useState } from "react";
import { supabase } from "../createClient";
import { ChangeEvent } from "react";
import "./SignupPage.css";

const SignupPage = () => {
  const [input, setInput] = useState<Record<string, string>>({});

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setInput((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSignUp(event: React.FormEvent) {
    event.preventDefault(); 

    if (!input.name || !input.id || !input.email || !input.password || !input.passwordconfirm) {
        alert("Please fill in all fields.");
        return;
    }
    if (input.password !== input.passwordconfirm) {
        alert("Passwords do not match.");
        return;
    }

    try {
        const { data: existingUser, error: fetchError } = await supabase
            .from('DIM_USER')
            .select('STUDENT_ID')
            .eq('STUDENT_ID', input.id);

        if (fetchError) {
            console.error("Error checking student ID:", fetchError.message);
            alert("An error occurred while checking Student ID.");
            return;
        }

        if (existingUser && existingUser.length > 0) {
            alert("Student ID already exists. Please use a different ID.");
            return;
        }
        const { error: insertError } = await supabase
            .from('DIM_USER')
            .insert([
                {
                    USER_NAME:input.name,
                    STUDENT_ID: input.id,
                    USER_EMAIL: input.email,
                    USER_PASS: input.password, 
                }
            ]);

        if (insertError) {
            console.error("Error signing up:", insertError.message);
            alert("Sign-up failed. Please try again.");
        } else {
            alert("Sign-up successful!");
        }
    } catch (err) {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <div className="right-container">
      <input
        name="name"
        type="text"
        placeholder="Name"
        id="name-input"
        className="form-control"
        onChange={handleChange}
      />
      <input
        name="id"
        type="number"
        placeholder="ID Number"
        id="id-input"
        className="form-control"
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        id="email-input"
        className="form-control"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        id="password-input"
        className="form-control"
        name="password"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        id="confirm-password-input"
        className="form-control"
        name="passwordconfirm"
        onChange={handleChange}
      />
      <button
        id="login-button"
        className="btn btn-primary"
        onClick={handleSignUp}
      >
        Sign up
      </button>
    </div>
  );
};

export default SignupPage;
