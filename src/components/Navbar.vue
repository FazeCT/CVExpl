
<template>
  <nav class="bg-transparent border-gray-200" style="font-family: 'Comfortaa';">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="https://gcc.ac/gcc_2024/" class="flex items-center space-x-3 rtl:space-x-reverse" style="font-family: 'Space Mono';">
          <img src="/icons/GCC.png" class="h-8" alt="CVExpl Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">CVExpl</span>
      </a>
      <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>
      <div class="hidden w-full bg-transparent md:block md:w-auto" id="navbar-default">
        <ul class="text-white font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse">
          <li>
            <a href="/" class="block px-4" style="background-color: transparent;"> Home</a>
          </li>
          <!-- <li>
            <a href="/search" class="block px-4" style="background-color: transparent;"> Scenario</a>
          </li> -->
        </ul>
      </div>
    </div>
  </nav> 
</template>