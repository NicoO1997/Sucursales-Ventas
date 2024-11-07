import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string | null;
  role: 'admin' | 'user';
  displayName?: string | null;
  photoURL?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth(); // Obtener la instancia de autenticación
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();
  
  private adminEmails: string[] = ['gonzalobianchini70@gmail.com', 'nicol4cho1997@gmail.com']; 

  constructor() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.userSubject.next({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: this.adminEmails.includes(user.email || '') ? 'admin' : 'user'
        });
      } else {
        this.userSubject.next(null);
      }
    });
  }


  async registerWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      
      if (result.user) {
        console.log('Usuario registrado:', result.user.email);
      }
      
      return result;
    } catch (error) {
      console.error('Error en registro con Google:', error);
      throw error;
    }
  }
  
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error en login con Google:', error);
      throw error;
    }
  }
  

  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }

  // Verificar si el usuario tiene rol de admin
  isAdmin(user: User | null): boolean {
    return user?.role === 'admin';
  }

  // Verificar si el usuario tiene rol de usuario normal
  isUser(user: User | null): boolean {
    return user?.role === 'user';
  }

  // Obtener el usuario actual
  getCurrentUser() {
    return this.auth.currentUser;
  }

  // Obtener el estado de autenticación
  getAuthState() {
    return this.auth.onAuthStateChanged; 
  }
}