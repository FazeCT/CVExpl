<template>
    <div style="font-family: 'Space Mono';">

        <div class="flex justify-center items-start text-xl text-white mt-10 mb-4">
            <div class="w-184 flex flex-wrap">
                <img src="/icons/exploit.svg" class="w-7 h-7 mr-2">
                <div class="">
                    CVExpl - CVEs & Exploits Database
                </div>
            </div>
        </div>
        <div class="flex items-center justify-center mt-6">
            <div class="flex flex-wrap w-184">
                <textarea 
                    v-model="tmpScenario"
                    type="search" 
                    class=" h-48 resize-none text-sm overflow-auto p-3 rounded-lg border bg-gray-50 border-gray-300 block w-132 focus:ring-red-500 focus:border-red-500" 
                    placeholder="Search for scenarios - let AI decides the keywords :D"
                ></textarea>

                <div class="ml-auto w-48 h-48 overflow-auto bg-leetcodeGray1 rounded-lg text-white">
                    <div v-for="item in checkList" :key="item">
                        <div class="flex items-center mb-4 bg-transparent px-2 py-2 hover:bg-leetcodeGray2 cursor-pointer ">
                            <a @click.prevent="addWazuh(item)"> {{ item }}</a>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div v-if="this.listEntry.length + this.wazuh_list.length > 0" class="flex justify-center mt-6">
            <div class="flex flex-wrap w-184" >
                <div v-for="item in listEntry" :key="item" class="os-item">
                    <div class="bg-leetcodeGray1 text-xs px-2 py-2 rounded-lg mx-auto flex text-white">{{ item }} 
                        <span>
                            <a @click.prevent="removeList(item)">
                                <svg class="w-4 h-4 text-white px-1 py-1 ml-2 bg-leetcodeGray2 hover:bg-leetcodeGray3 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                                </svg>
                            </a> 
                        </span>
                    </div>
                </div>
                <div v-for="item in wazuh_list" :key="item" class="os-item">
                    <div class="bg-leetcodeGray1 text-xs px-2 py-2 rounded-lg mx-auto flex text-white">{{ item }} 
                        <span>
                            <a @click.prevent="removeWazuh(item)">
                                <svg class="w-4 h-4 text-white px-1 py-1 ml-2 bg-leetcodeGray2 hover:bg-leetcodeGray3 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                                </svg>
                            </a> 
                        </span>
                    </div>
                </div>
                <div class="ml-auto os-item text-sm px-2 py-2 text-white">
                    <a @click.prevent="this.listEntry=[]; this.wazuh_list=[]" class="flex cursor-pointer ">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4"/>
                        </svg>
                        <div class="block text-sm rounded-xl bg-transparent">Reset</div>
                    </a>
                </div>
            </div>
        </div>
        <div class="flex justify-center items-center mt-6">
            <button @click.prevent="searchScenario" class="w-184 px-2 py-2 rounded-lg text-white bg-leetcodeGray1 hover:bg-leetcodeGray2">
                Submit
            </button>
        </div>

        <div class="flex justify-center items-center mt-6">
            <div class="flex items-center">
                <div class="flex-grow border-t border-white" style="width: 349px"></div>
                <div class="text-white mx-2">or</div>
                <div class="flex-grow border-t border-white" style="width: 349px"></div>
            </div>
        </div>

        <div class="flex justify-center mt-6">
            <div class="flex items-center mx-auto">   
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18 17v-2h1a1 1 0 0 0 0-2h-1a6 6 0 0 0-.4-1H17a2 2 0 0 0 2-2V8a1 1 0 0 0-2 0v2h-.5l-.5-.5V8a4 4 0 0 0-1-2.6l.7-.7c.2-.2.3-.4.3-.7V3a1 1 0 0 0-2 0v.6l-.7.6c-.8-.3-1.8-.3-2.6 0l-.7-.6V3a1 1 0 0 0-2 0v1c0 .3.1.5.3.7l.7.7A4 4 0 0 0 8 8v1.5l-.5.5H7V8a1 1 0 0 0-2 0v2a2 2 0 0 0 2 2h-.7a6 6 0 0 0-.2 1H5a1 1 0 0 0 0 2h1v2a2 2 0 0 0-2 2v2a1 1 0 1 0 2 0v-2h.8a6 6 0 0 0 4.2 3V12a1 1 0 0 1 2 0v10a6 6 0 0 0 4.2-3h.8v2a1 1 0 0 0 2 0v-2a2 2 0 0 0-2-2Zm-4-8.7a5.5 5.5 0 0 0-3-.3v.1a6 6 0 0 0-1 .3V8a2 2 0 1 1 4 0v.3Z"/>
                        </svg>
                    </div>
                    <input v-model="tmp" @keyup.enter="searchFunc" type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-172 ps-10 p-2.5" placeholder="Search for CVEs, exploits or anything i guess haha :D"/>
                </div>
                <button @click.prevent="searchFunc" type="submit" class="ml-auto p-2.5 ms-2 text-xs font-medium text-white bg-leetcodeGray1 rounded-lg hover:bg-leetcodeGray2">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span class="sr-only">Search</span>
                </button>
            </div>
            
        </div>

        <!-- <div class="flex items-center max-w-sm mx-auto"> -->
        <div class="flex justify-center mt-6">
            <div class="flex">
                <div class="mx-4">
                    <button id="dropdownDefaultButton1" data-dropdown-toggle="dropdown1" class="flex justify-between w-40 text-white bg-leetcodeGray1 hover:bg-leetcodeGray2 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700" type="button">Type<svg class="w-2.5 h-2.5 ms-3 ml-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>

                    <div id="dropdown1" class="z-10 hidden bg-leetcodeGray1 divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton1">
                            <div v-for="typ in base.type" :key="typ">
                                <li>
                                    <a @click.prevent="setType(typ)" class="cursor-pointer block px-4 py-2 text-white bg-leetcodeGray1 hover:bg-leetcodeGray2">{{ typ }}</a>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>

                <div class="mx-4">
                    <button id="dropdownDefaultButton3" data-dropdown-toggle="dropdown3" class="flex justify-between w-40 text-white bg-leetcodeGray1 hover:bg-leetcodeGray2 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">Category <span v-if="this.category.length >= 1" class="text-xs px-1 py-0.8 rounded-full bg-gray-600 mr-auto ml-2">{{ this.category.length }}</span><svg class="w-2.5 h-2.5 ms-3 ml-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>

                    <div id="dropdown3" class="w-96 z-10 hidden bg-leetcodeGray1 divide-y divide-gray-100 rounded-lg shadow w-44 px-2 py-2">
                        <div class="py-2 text-sm text-white" aria-labelledby="dropdownDefaultButton3">
                            <form class="flex items-center mb-4" @keydown.prevent.enter>   
                                <label for="simple-search1" class="sr-only">Search</label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18 17v-2h1a1 1 0 0 0 0-2h-1a6 6 0 0 0-.4-1H17a2 2 0 0 0 2-2V8a1 1 0 0 0-2 0v2h-.5l-.5-.5V8a4 4 0 0 0-1-2.6l.7-.7c.2-.2.3-.4.3-.7V3a1 1 0 0 0-2 0v.6l-.7.6c-.8-.3-1.8-.3-2.6 0l-.7-.6V3a1 1 0 0 0-2 0v1c0 .3.1.5.3.7l.7.7A4 4 0 0 0 8 8v1.5l-.5.5H7V8a1 1 0 0 0-2 0v2a2 2 0 0 0 2 2h-.7a6 6 0 0 0-.2 1H5a1 1 0 0 0 0 2h1v2a2 2 0 0 0-2 2v2a1 1 0 1 0 2 0v-2h.8a6 6 0 0 0 4.2 3V12a1 1 0 0 1 2 0v10a6 6 0 0 0 4.2-3h.8v2a1 1 0 0 0 2 0v-2a2 2 0 0 0-2-2Zm-4-8.7a5.5 5.5 0 0 0-3-.3v.1a6 6 0 0 0-1 .3V8a2 2 0 1 1 4 0v.3Z"/>
                                        </svg>
                                    </div>
                                    <input v-model="os_filter" type="text" id="simple-search1" class="text-white text-sm rounded-lg bg-leetcodeGray2 block w-full ps-10 p-2.5" placeholder="Filter" />
                                </div>
                            </form>
                            <div v-if="this.newOs.length < 1" class="px-1 text-red-500 font-bold">
                                No result
                            </div>
                            <div v-else class="flex flex-wrap">
                                <div v-for="cat in newCategory" :key="cat" class="os-item">
                                    <div v-if="this.category.includes(cat)">
                                        <a @click.prevent="removeCategory(cat)" class="cursor-pointer block px-2 py-2 text-white text-xs rounded-xl bg-blue-600 hover:bg-blue-500">{{ cat }}</a>
                                    </div>
                                    <div v-else>
                                        <a @click.prevent="setCategory(cat)" class="cursor-pointer block px-2 py-2 text-white text-xs rounded-xl bg-leetcodeGray2 hover:bg-leetcodeGray3">{{ cat }}</a>
                                    </div>
                                </div>
                            </div>
                            <hr class="mt-4 mb-2 border-t opacity-75 border-gray-400">
                            <a @click.prevent="clearCategory()" class="flex py-2 space-x-1 cursor-pointer text-white hover:text-gray-50">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4"/>
                                </svg>
                                <div class="block text-sm rounded-xl bg-transparent">Reset</div>
                            </a>
                            
                        </div>
                    </div>
                </div>

                <div class="mx-4">
                    <button id="dropdownDefaultButton2" data-dropdown-toggle="dropdown2" class="flex justify-between w-40 text-white bg-leetcodeGray1 hover:bg-leetcodeGray2 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">OS <span v-if="this.os.length >= 1" class="text-xs px-1 py-0.8 rounded-full bg-gray-600 mr-auto ml-2">{{ this.os.length }}</span> <svg class="w-2.5 h-2.5 ms-3 ml-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>

                    <div id="dropdown2" class="w-96 z-10 hidden bg-leetcodeGray1 divide-y divide-gray-100 rounded-lg shadow w-44 px-2 py-2">
                        <div class="py-2 text-sm text-white" aria-labelledby="dropdownDefaultButton2">
                            <form class="flex items-center mb-4" @keydown.prevent.enter>   
                                <label for="simple-search1" class="sr-only">Search</label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18 17v-2h1a1 1 0 0 0 0-2h-1a6 6 0 0 0-.4-1H17a2 2 0 0 0 2-2V8a1 1 0 0 0-2 0v2h-.5l-.5-.5V8a4 4 0 0 0-1-2.6l.7-.7c.2-.2.3-.4.3-.7V3a1 1 0 0 0-2 0v.6l-.7.6c-.8-.3-1.8-.3-2.6 0l-.7-.6V3a1 1 0 0 0-2 0v1c0 .3.1.5.3.7l.7.7A4 4 0 0 0 8 8v1.5l-.5.5H7V8a1 1 0 0 0-2 0v2a2 2 0 0 0 2 2h-.7a6 6 0 0 0-.2 1H5a1 1 0 0 0 0 2h1v2a2 2 0 0 0-2 2v2a1 1 0 1 0 2 0v-2h.8a6 6 0 0 0 4.2 3V12a1 1 0 0 1 2 0v10a6 6 0 0 0 4.2-3h.8v2a1 1 0 0 0 2 0v-2a2 2 0 0 0-2-2Zm-4-8.7a5.5 5.5 0 0 0-3-.3v.1a6 6 0 0 0-1 .3V8a2 2 0 1 1 4 0v.3Z"/>
                                        </svg>
                                    </div>
                                    <input v-model="os_filter" type="text" id="simple-search1" class="text-white text-sm rounded-lg bg-leetcodeGray2 block w-full ps-10 p-2.5" placeholder="Filter" />
                                </div>
                            </form>
                            <div v-if="this.newOs.length < 1" class="px-1 text-red-500 font-bold">
                                No result
                            </div>
                            <div v-else class="flex flex-wrap">
                                <div v-for="os in newOs" :key="os" class="os-item">
                                    <div v-if="this.os.includes(os)">
                                        <a @click.prevent="removeOS(os)" class="cursor-pointer block px-2 py-2 text-white text-xs rounded-xl bg-blue-600 hover:bg-blue-500">{{ os }}</a>
                                    </div>
                                    <div v-else>
                                        <a @click.prevent="setOS(os)" class="cursor-pointer block px-2 py-2 text-white text-xs rounded-xl bg-leetcodeGray2 hover:bg-leetcodeGray3">{{ os }}</a>
                                    </div>
                                </div>
                            </div>
                            <hr class="mt-4 mb-2 border-t opacity-75 border-gray-400">
                            <a @click.prevent="clearOS()" class="flex py-2 space-x-1 cursor-pointer text-white hover:text-gray-50">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4"/>
                                </svg>
                                <div class="block text-sm rounded-xl bg-transparent">Reset</div>
                            </a>
                            
                        </div>
                    </div>
                </div>

                <div class="mx-4">
                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="flex justify-between w-40 text-white bg-leetcodeGray1 hover:bg-leetcodeGray2 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">Impact<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>

                    <div id="dropdown" class="w-32 z-10 hidden bg-leetcodeGray1 divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <a @click.prevent="setImpact('Low')" class="cursor-pointer block px-4 py-2 text-green-500 bg-leetcodeGray1 hover:bg-leetcodeGray2">Low</a>
                        </li>
                        <li>
                            <a @click.prevent="setImpact('Medium')" class="cursor-pointer block px-4 py-2 text-yellow-500 bg-leetcodeGray1 hover:bg-leetcodeGray2">Medium</a>
                        </li>
                        <li>
                            <a @click.prevent="setImpact('High')" class="cursor-pointer block px-4 py-2 text-orange-400 bg-leetcodeGray1 hover:bg-leetcodeGray2">High</a>
                        </li>
                        <li>
                            <a @click.prevent="setImpact('Critical')" class="cursor-pointer block px-4 py-2 text-red-700 bg-leetcodeGray1 hover:bg-leetcodeGray2">Critical</a>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="flex justify-center mt-6">
            <div class="flex flex-wrap w-184" >
                <div v-if="name_search != ''" class="os-item">
                    <div class="bg-leetcodeGray1 text-xs px-2 py-2 rounded-lg text-white mx-auto flex">{{ name_search }} 
                        <span>
                            <a @click.prevent="removeInput()">
                                <svg class="w-4 h-4 text-white px-1 py-1 ml-2 bg-leetcodeGray2 hover:bg-leetcodeGray3 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                                </svg>
                            </a> 
                        </span>
                    </div>
                </div>
                <div v-for="item in type" :key="item" class="os-item">
                    <div class="bg-leetcodeGray1 text-xs px-2 py-2 rounded-lg text-white mx-auto flex">{{ item }} 
                        <span>
                            <a @click.prevent="removeType(item)">
                                <svg class="w-4 h-4 text-white px-1 py-1 ml-2 bg-leetcodeGray2 hover:bg-leetcodeGray3 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                                </svg>
                            </a> 
                        </span>
                    </div>
                </div>
                <div v-for="item in category" :key="item" class="os-item">
                    <div class="bg-leetcodeGray1 text-xs px-2 py-2 rounded-lg text-white mx-auto flex">{{ item }} 
                        <span>
                            <a @click.prevent="removeCategory(item)">
                                <svg class="w-4 h-4 text-white px-1 py-1 ml-2 bg-leetcodeGray2 hover:bg-leetcodeGray3 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                                </svg>
                            </a> 
                        </span>
                    </div>
                </div>
                <div v-for="item in os" :key="item" class="os-item">
                    <div class="bg-leetcodeGray1 text-xs px-2 py-2 rounded-lg text-white mx-auto flex">{{ item }} 
                        <span>
                            <a @click.prevent="removeOS(item)">
                                <svg class="w-4 h-4 text-white px-1 py-1 ml-2 bg-leetcodeGray2 hover:bg-leetcodeGray3 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                                </svg>
                            </a> 
                        </span>
                    </div>
                </div>
                <div v-for="item in impact" :key="item" class="os-item">
                    <div class="bg-leetcodeGray1 text-xs px-2 py-2 rounded-lg mx-auto flex" :class="impact_col[base.impact.indexOf(item)]">{{ item }} 
                        <span>
                            <a @click.prevent="removeImpact(item)">
                                <svg class="w-4 h-4 text-white px-1 py-1 ml-2 bg-leetcodeGray2 hover:bg-leetcodeGray3 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                                </svg>
                            </a> 
                        </span>
                    </div>
                </div>

                <div v-if="os.length + category.length + type.length + impact.length + name_search.length > 0" class="ml-auto os-item text-sm px-2 py-2 text-white">
                    <a @click.prevent="clear()" class="flex cursor-pointer ">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4"/>
                        </svg>
                        <div class="block text-sm rounded-xl bg-transparent">Reset</div>
                    </a>
                </div>
            </div>
        </div>
        <div v-if="current_content.length > 0" class="mb-12">
            <div class="mt-6 mb-4">
                <table class="mx-auto w-224 mt-4 mb-2 border-leetcodeGray3">
                    <tbody>
                        <tr>
                            <td class="border-b p-2 opacity-50 text-white font-bold">Title</td>
                        </tr>
                        <div v-if="isSidebarOpen" class="fixed inset-0 bg-black opacity-30 z-30 transition-opacity duration-500" @click="isSidebarOpen = false; doingKeyword=false; doingScenario=false; current_choice=''; current_report=''"></div>                                
                        <div v-for="(item, index) in current_content" :key="item">
                            <tr :class="['bg-transparent hover:bg-leetcodeGray2', 'bg-leetcodeGray1 hover:bg-leetcodeGray3'][index & 1]">
                                <td class="px-2 py-4 text-white font-medium w-224" @click="chooseEntry(item)">
                                    {{ item.name }}
                                </td> 
                                <div id="drawer-navigation" :class="{'-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen}" class="fixed top-0 left-0 z-40 w-184 h-screen p-4 overflow-y-auto transition-transform duration-500 bg-sidebar" tabindex="-1" aria-labelledby="drawer-navigation-label" style="font-family:'Space Mono'">
                                    <div id="drawer-navigation-label" class="font-semibold text-white flex flex-wrap">
                                        <span class="mr-2">
                                            <img src="/icons/exploit2.svg" class="w-7 h-7 mr-2">
                                        </span>
                                        Information
                                    </div>
                                    <div v-if="doingKeyword">
                                        <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-white bg-leetcodeGray2 hover:bg-leetcodeGray3 hover:leetcodeGray1 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center" @click="isSidebarOpen = false; doingKeyword=false; doingScenario=false; current_choice=''">                                        
                                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            <span class="sr-only">Close sidebar</span>
                                        </button>
                                        <div class="py-4 font-semibold text-2xl overflow-y-auto text-white">
                                            {{ current_choice.name }}
                                        </div>
                                        <!-- <div class="py-4 font-semibold overflow-y-auto" :class="impact_col[base.impact.indexOf(current_choice.impact)]">
                                            {{ current_choice.impact }}
                                        </div> -->
                                        <div class="py-4 overflow-y-auto text-white mb-4">
                                            {{ current_choice.description }}
                                        </div>
                                        <a @click.prevent="addList(current_choice.name)" class="cursor-pointer py-4 overflow-y-auto text-white hover:underline flex flex-wrap">
                                            <span class="mr-2">
                                                <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                </svg>
                                            </span>
                                            Add to scenario search
                                        </a>
                                    </div>
                                </div>
                            </tr>
                        </div>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="current_content.length > 0" class="mb-12">
            <div class="flex flex-col items-center">
                <span class="font-bold text-gray-500">
                    Showing <span class="font-semibold text-white">{{ 1 + (current_page - 1)*page_size }}</span> to <span class="font-semibold text-white">{{ Math.min(this.current_page * page_size, this.cache.length) }}</span> of <span class="font-semibold text-white">{{ this.cache.length }}</span> Entries
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                    <button @click.prevent="decreasePage()" class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-leetcodeGray1 rounded-s hover:bg-leetcodeGray2">
                        Prev
                    </button>
                    <button @click.prevent="increasePage()" class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-leetcodeGray1 border-0 border-s border-gray-700 rounded-e hover:bg-leetcodeGray2">
                        Next
                    </button>
                </div>
            </div>
        </div>

        <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="fixed inset-0 bg-black opacity-30"></div>      
            <div role="status">
                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>                        
    </div>
</template>

<script>
// import { useStore } from 'vuex'
import VueMarkdown from 'vue-markdown';

export default {
    name: "Home",
    components: {
        VueMarkdown
    },
    data () {
        return {
            tmp: '',
            name_search: '',
            page_size:50,
            os: [],
            type: [],
            category: [],
            impact: [],
            os_filter: '',
            current_page: 1,
            isSidebarOpen: false,
            impact_col: ['text-green-500', 'text-yellow-500', 'text-orange-400', 'text-red-700'],
            category_filter: '',
            base: {
                os: ['Windows 7', 'Windows 8', 'Windows 10', 'Windows 11', 'Linux', 'macOS', 'iOS 13', 'iOS 14', 'iOS 15', 'iOS 16'],
                type: ['CVE', 'Exploit'],
                category: ['Web', 'Network', 'Pwn', 'Malware'],
                impact: ['Low', 'Medium', 'High', 'Critical']
            },

            current_content: [],

            isLoading: false,

            current_choice: {
                name: '',
                description: '',
                impact: ''
            },

            cache: [],
            cacheInput: '',
            cacheTags: [],

            listEntry: [],

            tmpScenario: '',
            scenario: '',

            doingScenario: false,
            doingKeyword: false,

            current_report: '',

            wazuhh: {
                "_shards": {
                    "failed": 0,
                    "skipped": 0,
                    "successful": 9,
                    "total": 9
                },
                "hits": {
                    "hits": [
                        {
                            "_id": "qbgy0o0BJxh893opzz3X",
                            "_index": "wazuh-alerts-4.x-2024.02.22",
                            "_score": 1.0,
                            "_source": {
                                "@timestamp": "2024-02-22T19:02:35.441Z",
                                "agent": {
                                    "id": "001",
                                    "ip": "172.233.66.97",
                                    "name": "agent1"
                                },
                                "data": {
                                    "foreign_ip": "100.102.198.80",
                                    "foreign_port": "4444",
                                    "local_ip": "100.78.169.113",
                                    "local_port": "32962"
                                },
                                "decoder": {
                                    "name": "ossec",
                                    "parent": "ossec"
                                },
                                "full_log": "ossec: output: 'webshell connections':\n100.78.169.113:32962|100.102.198.80:4444\n127.0.0.1:53050|127.0.0.1:3306\n127.0.0.1:53054|127.0.0.1:3306",
                                "id": "1708628555.1501856",
                                "input": {
                                    "type": "log"
                                },
                                "location": "webshell connections",
                                "manager": {
                                    "name": "wazuh.manager"
                                },
                                "rule": {
                                    "description": "[Network connection]: Script attempting network connection on source port: 32962 and destination port: 4444",
                                    "firedtimes": 1,
                                    "groups": [
                                        "linux",
                                        " webshell"
                                    ],
                                    "id": "100510",
                                    "level": 12,
                                    "mail": true,
                                    "mitre": {
                                        "id": [
                                            "TA0011",
                                            "T1049",
                                            "T1505.003"
                                        ],
                                        "tactic": [
                                            "Discovery",
                                            "Persistence"
                                        ],
                                        "technique": [
                                            "System Network Connections Discovery",
                                            "Web Shell"
                                        ]
                                    }
                                },
                                "timestamp": "2024-02-22T19:02:35.441+0000"
                            }
                        },
                        {
                            "_id": "sLg00o0BJxh893opmD3d",
                            "_index": "wazuh-alerts-4.x-2024.02.22",
                            "_score": 1.0,
                            "_source": {
                                "@timestamp": "2024-02-22T19:04:35.536Z",
                                "agent": {
                                    "id": "001",
                                    "ip": "172.233.66.97",
                                    "name": "agent1"
                                },
                                "data": {
                                    "foreign_ip": "100.102.198.80",
                                    "foreign_port": "4444",
                                    "local_ip": "100.78.169.113",
                                    "local_port": "32962"
                                },
                                "decoder": {
                                    "name": "ossec",
                                    "parent": "ossec"
                                },
                                "full_log": "ossec: output: 'webshell connections':\n100.78.169.113:32962|100.102.198.80:4444\n127.0.0.1:53050|127.0.0.1:3306\n127.0.0.1:53054|127.0.0.1:3306",
                                "id": "1708628675.1505489",
                                "input": {
                                    "type": "log"
                                },
                                "location": "webshell connections",
                                "manager": {
                                    "name": "wazuh.manager"
                                },
                                "rule": {
                                    "description": "[Network connection]: Script attempting network connection on source port: 32962 and destination port: 4444",
                                    "firedtimes": 2,
                                    "groups": [
                                        "linux",
                                        " webshell"
                                    ],
                                    "id": "100510",
                                    "level": 12,
                                    "mail": true,
                                    "mitre": {
                                        "id": [
                                            "TA0011",
                                            "T1049",
                                            "T1505.003"
                                        ],
                                        "tactic": [
                                            "Discovery",
                                            "Persistence"
                                        ],
                                        "technique": [
                                            "System Network Connections Discovery",
                                            "Web Shell"
                                        ]
                                    }
                                },
                                "timestamp": "2024-02-22T19:04:35.536+0000"
                            }
                        },
                        {
                            "_id": "s7g20o0BJxh893opgT0y",
                            "_index": "wazuh-alerts-4.x-2024.02.22",
                            "_score": 1.0,
                            "_source": {
                                "@timestamp": "2024-02-22T19:06:35.575Z",
                                "agent": {
                                    "id": "001",
                                    "ip": "172.233.66.97",
                                    "name": "agent1"
                                },
                                "data": {
                                    "foreign_ip": "100.102.198.80",
                                    "foreign_port": "4444",
                                    "local_ip": "100.78.169.113",
                                    "local_port": "32962"
                                },
                                "decoder": {
                                    "name": "ossec",
                                    "parent": "ossec"
                                },
                                "full_log": "ossec: output: 'webshell connections':\n100.78.169.113:32962|100.102.198.80:4444\n127.0.0.1:53050|127.0.0.1:3306\n127.0.0.1:53054|127.0.0.1:3306",
                                "id": "1708628795.1505968",
                                "input": {
                                    "type": "log"
                                },
                                "location": "webshell connections",
                                "manager": {
                                    "name": "wazuh.manager"
                                },
                                "rule": {
                                    "description": "[Network connection]: Script attempting network connection on source port: 32962 and destination port: 4444",
                                    "firedtimes": 3,
                                    "groups": [
                                        "linux",
                                        " webshell"
                                    ],
                                    "id": "100510",
                                    "level": 12,
                                    "mail": true,
                                    "mitre": {
                                        "id": [
                                            "TA0011",
                                            "T1049",
                                            "T1505.003"
                                        ],
                                        "tactic": [
                                            "Discovery",
                                            "Persistence"
                                        ],
                                        "technique": [
                                            "System Network Connections Discovery",
                                            "Web Shell"
                                        ]
                                    }
                                },
                                "timestamp": "2024-02-22T19:06:35.575+0000"
                            }
                        },
                        {
                            "_id": "t7g40o0BJxh893opVT3u",
                            "_index": "wazuh-alerts-4.x-2024.02.22",
                            "_score": 1.0,
                            "_source": {
                                "@timestamp": "2024-02-22T19:08:35.709Z",
                                "agent": {
                                    "id": "001",
                                    "ip": "172.233.66.97",
                                    "name": "agent1"
                                },
                                "data": {
                                    "foreign_ip": "100.102.198.80",
                                    "foreign_port": "4444",
                                    "local_ip": "100.78.169.113",
                                    "local_port": "32962"
                                },
                                "decoder": {
                                    "name": "ossec",
                                    "parent": "ossec"
                                },
                                "full_log": "ossec: output: 'webshell connections':\n100.78.169.113:32962|100.102.198.80:4444\n127.0.0.1:53050|127.0.0.1:3306\n127.0.0.1:53054|127.0.0.1:3306",
                                "id": "1708628915.1508021",
                                "input": {
                                    "type": "log"
                                },
                                "location": "webshell connections",
                                "manager": {
                                    "name": "wazuh.manager"
                                },
                                "rule": {
                                    "description": "[Network connection]: Script attempting network connection on source port: 32962 and destination port: 4444",
                                    "firedtimes": 4,
                                    "groups": [
                                        "linux",
                                        " webshell"
                                    ],
                                    "id": "100510",
                                    "level": 12,
                                    "mail": true,
                                    "mitre": {
                                        "id": [
                                            "TA0011",
                                            "T1049",
                                            "T1505.003"
                                        ],
                                        "tactic": [
                                            "Discovery",
                                            "Persistence"
                                        ],
                                        "technique": [
                                            "System Network Connections Discovery",
                                            "Web Shell"
                                        ]
                                    }
                                },
                                "timestamp": "2024-02-22T19:08:35.709+0000"
                            }
                        },
                        {
                            "_id": "zdafzI0BE3KXgFPMQ3o3",
                            "_index": "wazuh-alerts-4.x-2024.02.21",
                            "_score": 1.0,
                            "_source": {
                                "@timestamp": "2024-02-21T17:03:23.595Z",
                                "agent": {
                                    "id": "001",
                                    "ip": "172.233.66.97",
                                    "name": "agent1"
                                },
                                "data": {
                                    "foreign_ip": "127.0.0.1",
                                    "foreign_port": "3306",
                                    "local_ip": "127.0.0.1",
                                    "local_port": "51904"
                                },
                                "decoder": {
                                    "name": "ossec",
                                    "parent": "ossec"
                                },
                                "full_log": "ossec: output: 'webshell connections':\n127.0.0.1:51904|127.0.0.1:3306\n172.233.66.97:47592|3.134.125.175:17132\n127.0.0.1:51918|127.0.0.1:3306",
                                "id": "1708535003.2075808",
                                "input": {
                                    "type": "log"
                                },
                                "location": "webshell connections",
                                "manager": {
                                    "name": "wazuh.manager"
                                },
                                "rule": {
                                    "description": "[Network connection]: Script attempting network connection on source port: 51904 and destination port: 3306",
                                    "firedtimes": 2,
                                    "groups": [
                                        "linux",
                                        " webshell"
                                    ],
                                    "id": "100510",
                                    "level": 12,
                                    "mail": true,
                                    "mitre": {
                                        "id": [
                                            "TA0011",
                                            "T1049",
                                            "T1505.003"
                                        ],
                                        "tactic": [
                                            "Discovery",
                                            "Persistence"
                                        ],
                                        "technique": [
                                            "System Network Connections Discovery",
                                            "Web Shell"
                                        ]
                                    }
                                },
                                "timestamp": "2024-02-21T17:03:23.595+0000"
                            }
                        },
                        {
                            "_id": "zNadzI0BE3KXgFPMgXr_",
                            "_index": "wazuh-alerts-4.x-2024.02.21",
                            "_score": 1.0,
                            "_source": {
                                "@timestamp": "2024-02-21T17:01:23.533Z",
                                "agent": {
                                    "id": "001",
                                    "ip": "172.233.66.97",
                                    "name": "agent1"
                                },
                                "data": {
                                    "foreign_ip": "127.0.0.1",
                                    "foreign_port": "3306",
                                    "local_ip": "127.0.0.1",
                                    "local_port": "51904"
                                },
                                "decoder": {
                                    "name": "ossec",
                                    "parent": "ossec"
                                },
                                "full_log": "ossec: output: 'webshell connections':\n127.0.0.1:51904|127.0.0.1:3306\n172.233.66.97:47592|3.134.125.175:17132\n127.0.0.1:51918|127.0.0.1:3306",
                                "id": "1708534883.2075340",
                                "input": {
                                    "type": "log"
                                },
                                "location": "webshell connections",
                                "manager": {
                                    "name": "wazuh.manager"
                                },
                                "rule": {
                                    "description": "[Network connection]: Script attempting network connection on source port: 51904 and destination port: 3306",
                                    "firedtimes": 1,
                                    "groups": [
                                        "linux",
                                        " webshell"
                                    ],
                                    "id": "100510",
                                    "level": 12,
                                    "mail": true,
                                    "mitre": {
                                        "id": [
                                            "TA0011",
                                            "T1049",
                                            "T1505.003"
                                        ],
                                        "tactic": [
                                            "Discovery",
                                            "Persistence"
                                        ],
                                        "technique": [
                                            "System Network Connections Discovery",
                                            "Web Shell"
                                        ]
                                    }
                                },
                                "timestamp": "2024-02-21T17:01:23.533+0000"
                            }
                        },
                        {
                            "_id": "wLg60o0BJxh893opHj37",
                            "_index": "wazuh-alerts-4.x-2024.02.22",
                            "_score": 1.0,
                            "_source": {
                                "@timestamp": "2024-02-22T19:10:35.830Z",
                                "agent": {
                                    "id": "001",
                                    "ip": "172.233.66.97",
                                    "name": "agent1"
                                },
                                "data": {
                                    "foreign_ip": "100.102.198.80",
                                    "foreign_port": "4444",
                                    "local_ip": "100.78.169.113",
                                    "local_port": "32962"
                                },
                                "decoder": {
                                    "name": "ossec",
                                    "parent": "ossec"
                                },
                                "full_log": "ossec: output: 'webshell connections':\n100.78.169.113:32962|100.102.198.80:4444\n127.0.0.1:53050|127.0.0.1:3306\n127.0.0.1:53054|127.0.0.1:3306",
                                "id": "1708629035.1511652",
                                "input": {
                                    "type": "log"
                                },
                                "location": "webshell connections",
                                "manager": {
                                    "name": "wazuh.manager"
                                },
                                "rule": {
                                    "description": "[Network connection]: Script attempting network connection on source port: 32962 and destination port: 4444",
                                    "firedtimes": 5,
                                    "groups": [
                                        "linux",
                                        " webshell"
                                    ],
                                    "id": "100510",
                                    "level": 12,
                                    "mail": true,
                                    "mitre": {
                                        "id": [
                                            "TA0011",
                                            "T1049",
                                            "T1505.003"
                                        ],
                                        "tactic": [
                                            "Discovery",
                                            "Persistence"
                                        ],
                                        "technique": [
                                            "System Network Connections Discovery",
                                            "Web Shell"
                                        ]
                                    }
                                },
                                "timestamp": "2024-02-22T19:10:35.830+0000"
                            }
                        }
                    ],
                    "max_score": 1.0,
                    "total": {
                        "relation": "eq",
                        "value": 7
                    }
                },
                "timed_out": false,
                "took": 4
            },

            checkList: [],

            wazuh_list: []
        }
    },
    computed: {
        newOs() {
            // console.log('hi')

            if (!this.os_filter) {
                // console.log(this.base.os)
                return this.base.os;
            }
            console.log(this.base.os.filter(os => os.includes(this.os_filter)))
            return this.base.os.filter(os => os.includes(this.os_filter));
        },

        newCategory() {
            if (!this.category_filter) {
                return this.base.category;
            }
            return this.base.category.filter(category => category.includes(this.category_filter));
        }
    },
    mounted() {
        this.wazuhh.hits.hits.forEach((item) => {
            this.checkList.push(item._source['@timestamp'])
        })
        console.log(this.checkList)
    },
    methods: {
        addWazuh(item) {
            if(!this.checkDuplicate(this.wazuh_list, item)) this.wazuh_list.push(item)
        },
        searchScenario() {
            this.doingScenario = true
            this.doingKeyword = false
            this.scenario = this.tmpScenario
            // concat all listEntry to scenario as well
            if (this.listEntry.length > 0) {this.scenario = this.scenario + '\n' + this.listEntry.join('\n')}
            
            // for each entry in wazuh_list, concat a json in wazuhh that correspond with that @timestamp
            this.wazuh_list.forEach((item) => {
                this.wazuhh.hits.hits.forEach((entry) => {
                    if (entry._source['@timestamp'] === item) {
                        this.scenario = this.scenario + '\n' + JSON.stringify(entry._source)
                    }
                })
            })
            console.log(this.scenario)

            this.isLoading = true;

            if(this.scenario === '') {
                this.isLoading = false;
                return Promise.resolve([]);
            }

            const url = 'https://xxxxxxxxxxxxxxxxxxxxx.ngrok-free.app/scenario';

            return fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: this.scenario }),
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                this.current_report = data;
                // save it into report.md and download it
                let blob = new Blob([this.current_report], { type: 'text/markdown' });
                let url = URL.createObjectURL(blob);
                let link = document.createElement('a');
                link.href = url;
                link.download = 'report.md';
                link.click();

                this.isLoading = false;
            })
            .catch(error => {
                console.error(error);
                this.isLoading = false;
            });
        },

        addList(item) {
            if(!this.checkDuplicate(this.listEntry, item)) this.listEntry.push(item)
            console.log(this.listEntry)
            this.isSidebarOpen = false
        },

        removeList(item) {
            this.listEntry = this.listEntry.filter(entry => entry !== item)
        },

        removeWazuh(item) {
            this.wazuh_list = this.wazuh_list.filter(entry => entry !== item)
        },

        async searchFunc() {
            this.name_search = this.tmp;
            console.log('called')
            await this.getPageContent()
            this.sanitize()
        },
        sanitize() {
            if (this.os.length == 0 && this.type.length == 0 && this.category.length == 0 && this.impact.length == 0 && this.name_search == '') {
                this.current_content = []
                this.current_page = 1
            }
        },
        chooseEntry(entry) {
            this.doingScenario = false
            this.doingKeyword = true
            this.current_choice = entry
            console.log(entry)
            this.isSidebarOpen = true
        },
        getList() {
            this.isLoading = true;
            const tags = [...this.os, ...this.type, ...this.category, ...this.impact];
            if (this.cacheTags.sort().toString() === tags.sort().toString() && this.cacheInput === this.name_search) {
                this.isLoading = false;
                return Promise.resolve(this.cache);
            }
            this.cacheTags = tags.sort();
            this.cacheInput = this.name_search;

            if(tags.length === 0 && this.name_search === '') {
                this.isLoading = false;
                this.cache = [];
                return Promise.resolve([]);
            }

            const url = 'https://xxxxxxxxxxxxxxxxxxxxx.ngrok-free.app/keyword';

            console.log(tags);

            return fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tags, name: this.name_search }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.cache = data;
                this.isLoading = false;
                return data;
            })
            .catch(error => {
                console.error(error);
                this.cache = [];
                this.isLoading = false;
                return [];
            });
        },
        async getPageContent() {
            let current = await this.getList();
            console.log(current)
            this.current_content = current.slice((this.current_page - 1) * this.page_size, this.current_page * this.page_size);
            console.log(this.current_content)
        },
        async increasePage() {
            let current = await this.getList();
            if(this.current_page < current.length / this.page_size) {
                this.current_page += 1
            }
            await this.getPageContent()
        },
        async decreasePage() {
            if(this.current_page > 1) {
                this.current_page -= 1
            }
            await this.getPageContent()
        },
        checkDuplicate(arr, value) {
            return arr.includes(value)
        },
        async setImpact(impact) {
            if(!this.checkDuplicate(this.impact, impact)) {
                this.impact.push(impact)
            }
            await this.getPageContent()
            this.sanitize()
        },
        async removeImpact(impact) {
            this.impact = this.impact.filter(item => item !== impact)
            await this.getPageContent()
            this.sanitize()
        },
        async clearImpact() {
            this.impact = []
            await this.getPageContent()
            this.sanitize()
        },
        async setCategory(category) {
            if(!this.checkDuplicate(this.category, category)) {
                this.category.push(category)
            }
            await this.getPageContent()
            this.sanitize()
        },
        async removeCategory(category) {
            this.category = this.category.filter(item => item !== category)
            await this.getPageContent()
            this.sanitize()
        },
        async clearCategory() {
            this.category = []
            await this.getPageContent()
            this.sanitize()
        },
        async setType(type) {
            if(!this.checkDuplicate(this.type, type)) {
                this.type.push(type)
            }
            await this.getPageContent()
            this.sanitize()
        },
        async removeType(type) {
            this.type = this.type.filter(item => item !== type)
            await this.getPageContent()
            this.sanitize()
        },
        async clearType() {
            this.type = []
            await this.getPageContent()
            this.sanitize()
        },
        async setOS(os) {
            if(!this.checkDuplicate(this.os, os)) {
                this.os.push(os)
            }
            await this.getPageContent()
            this.sanitize()
        },
        async removeOS(os) {
            this.os = this.os.filter(item => item !== os)
            await this.getPageContent()
            this.sanitize()
        },
        async clearOS() {
            this.os = []
            await this.getPageContent()
            this.sanitize()
        },
        async clear() {
            this.os = []
            this.type = []
            this.category = []
            this.impact = []
            this.current_page = 1
            await this.removeInput()
        },
        async removeInput() {
            this.tmp = ''
            this.name_search = ''
            await this.getPageContent()
            this.sanitize()
        }
    }
}
</script>

<style scoped>
.os-item {
  margin-right: 0.5rem;
  margin-top: 0.5rem;
}
</style>