 98 lines (90 sloc) 2.22 KB
<template>
  <div id="app" class="flex flex flex-col min-h-screen bg-gray-400">
    <modalConfirm />
    <modalAccount />
    <modalForm />
    <Header />
    <main
      class="app__content flex"
    >
      <div class="w-full sm:w-3/8 lg:w-2/8">
        <Sidebar />
      </div>
      <div class="w-full sm:w-5/8 lg:w-6/8">
        <router-view />
      </div>
    </main>

    <Footer class="py-6" />
  </div>
</template>
