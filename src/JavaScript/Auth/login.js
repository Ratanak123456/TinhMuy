export const loginTemplate = `
<div class="min-h-screen flex flex-col p-8 font-sans bg-page-bg dark:bg-primary-900 transition-colors duration-300">
  <header>
    <button id="backToHome" class="flex items-center text-primary-500 font-medium hover:text-primary-800 mb-8 lg:mb-0 transition-colors">
      <span class="mr-2">←</span> Back to home
    </button>
  </header>

  <div class="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl mx-auto w-full">
    <article class="flex-1 w-full flex items-center justify-center p-4 h-full">
      <section class="w-full max-w-md bg-white dark:bg-primary-800 rounded-2xl shadow-xl p-8 space-y-6 h-fit transition-colors duration-300">
        <header class="text-center space-y-2">
          <div class="flex justify-center">
            <img src="../../asset/logo.png" alt="Login Icon" class="w-20 h-20">
          </div>
          <h1 class="text-3xl font-semibold text-primary-600 dark:text-secondary-200">Login</h1>
          <p class="text-primary-500 dark:text-primary-300 text-sm">If you are already a member, easily log in now.</p>
        </header>

        <form id="loginForm" class="space-y-4">
          <div class="space-y-1">
            <label for="loginEmail" class="block text-sm font-medium text-primary-700 dark:text-primary-200 ml-1">Email</label>
            <input id="loginEmail" type="email" placeholder="Email" required class="w-full px-4 py-3 rounded-xl border border-primary-200 dark:border-primary-600 bg-white dark:bg-primary-700 outline-none focus:ring-2 focus:ring-secondary-light/40 dark:focus:ring-secondary-400/40 focus:border-secondary-600 dark:focus:border-secondary-400 transition-all placeholder:text-primary-300 dark:placeholder:text-primary-400 text-primary-800 dark:text-primary-100">
          </div>

          <div class="space-y-1">
            <label for="loginPassword" class="block text-sm font-medium text-primary-700 dark:text-primary-200 ml-1">Password</label>
            <input id="loginPassword" type="password" placeholder="Password" required class="w-full px-4 py-3 rounded-xl border border-primary-200 dark:border-primary-600 bg-white dark:bg-primary-700 outline-none focus:ring-2 focus:ring-secondary-light/40 dark:focus:ring-secondary-400/40 focus:border-secondary-600 dark:focus:border-secondary-400 transition-all placeholder:text-primary-300 dark:placeholder:text-primary-400 text-primary-800 dark:text-primary-100">
          </div>

          <div class="text-right">
            <button type="button" id="forgotPassword" class="text-xs font-medium text-accent-brand hover:underline hover:text-accent-700 dark:hover:text-accent-300 transition-colors">Forgot Password?</button>
          </div>

          <button type="submit" id="loginButton" class="w-full py-3 bg-secondary-600 dark:bg-secondary-700 text-white font-semibold rounded-lg shadow-md hover:bg-secondary-700 dark:hover:bg-secondary-600 active:scale-[0.98] transition-all">
            Login
          </button>
        </form>

        <div class="relative flex items-center justify-center">
          <div class="w-full border-t border-primary-100 dark:border-primary-600"></div>
          <span class="absolute bg-white dark:bg-primary-800 px-4 text-xs text-primary-400 dark:text-primary-300 transition-colors duration-300">Or login with</span>
        </div>

        <button type="button" id="googleLogin" class="w-full py-3 border border-primary-100 dark:border-primary-600 rounded-xl flex items-center justify-center gap-3 hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors duration-300">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
          </svg>
          <span class="text-primary-700 dark:text-primary-200 text-sm font-medium">Continue with Google</span>
        </button>

        <footer class="text-center text-sm text-primary-500 dark:text-primary-300">
          Do not have an account?
          <button id="showRegister" class="text-accent-brand font-semibold hover:underline hover:text-accent-700 dark:hover:text-accent-300 ml-1 transition-colors">Register</button>
        </footer>
      </section>
    </article>

<aside class="hidden lg:flex flex-1 items-center justify-center h-full relative">
  <figure class="h-full flex items-center justify-center">
    <img src="/asset/login.svg" alt="Login Illustration" class="max-h-137.5 w-auto object-contain rounded-2xl shadow-2xl h-full">
  </figure>
  <a href="https://storyset.com/user" class="absolute bottom-4 right-4 text-xs text-primary-500 dark:text-primary-300 bg-white/80 dark:bg-primary-800/80 px-3 py-1 rounded-lg hover:underline transition-colors">
  </a>
</aside>
  </div>
</div>`;