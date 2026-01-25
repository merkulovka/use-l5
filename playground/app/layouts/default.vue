<template>
    <div>
        <header>
            <nav>
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li>
                        <NuxtLink
                            to="/middleware?age=25&skills=html&skills=css"
                        >
                            Middleware
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </header>
        <slot />
    </div>
</template>

<script setup lang="ts"></script>
