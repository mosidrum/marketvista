import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  User,
  AuthError
} from "firebase/auth";
import { auth } from "@/firebase";

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export const signUpUser = async (data: SignUpData): Promise<AuthResponse> => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;

    // Update user profile with display name
    if (user) {
      await updateProfile(user, {
        displayName: data.name
      });
    }

    return {
      success: true,
      user
    };
  } catch (error) {
    const authError = error as AuthError;
    let errorMessage = "An error occurred during signup";

    // Handle specific Firebase auth errors
    switch (authError.code) {
      case "auth/email-already-in-use":
        errorMessage = "An account with this email already exists";
        break;
      case "auth/invalid-email":
        errorMessage = "Please enter a valid email address";
        break;
      case "auth/weak-password":
        errorMessage = "Password should be at least 6 characters";
        break;
      case "auth/operation-not-allowed":
        errorMessage = "Email/password accounts are not enabled";
        break;
      default:
        errorMessage = authError.message || errorMessage;
    }

    return {
      success: false,
      error: errorMessage
    };
  }
};

export const signInUser = async (data: SignInData): Promise<AuthResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    return {
      success: true,
      user: userCredential.user
    };
  } catch (error) {
    const authError = error as AuthError;
    let errorMessage = "An error occurred during signin";

    // Handle specific Firebase auth errors
    switch (authError.code) {
      case "auth/user-not-found":
        errorMessage = "No account found with this email";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password";
        break;
      case "auth/invalid-email":
        errorMessage = "Please enter a valid email address";
        break;
      case "auth/user-disabled":
        errorMessage = "This account has been disabled";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many failed attempts. Please try again later";
        break;
      default:
        errorMessage = authError.message || errorMessage;
    }

    return {
      success: false,
      error: errorMessage
    };
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback);
};

export const signInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    return {
      success: true,
      user: userCredential.user
    };
  } catch (error) {
    const authError = error as AuthError;
    let errorMessage = "An error occurred during Google signin";

    // Handle specific Firebase auth errors
    switch (authError.code) {
      case "auth/popup-closed-by-user":
        errorMessage = "Sign-in was cancelled";
        break;
      case "auth/popup-blocked":
        errorMessage = "Pop-up was blocked by browser. Please allow pop-ups and try again";
        break;
      case "auth/cancelled-popup-request":
        errorMessage = "Sign-in was cancelled";
        break;
      case "auth/account-exists-with-different-credential":
        errorMessage = "An account already exists with the same email address but different sign-in credentials";
        break;
      default:
        errorMessage = authError.message || errorMessage;
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}; 