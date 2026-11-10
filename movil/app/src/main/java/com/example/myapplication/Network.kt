package com.example.myapplication


import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Path

data class ElementoCatalogo(val id: Int, val nombre: String?, val nombre_completo: String?) {
    val displayNombre: String get() = nombre_completo ?: nombre ?: "Anónimo"
}

data class Obra(val id: Int, val titulo: String, val sinopsis: String, val url_pdf: String)
data class RespuestaCatalogoConObras(val id: Int, val obras: List<Obra>?)

interface ApiService {
    @GET("autores")
    suspend fun getListaAutores(): List<ElementoCatalogo>

    @GET("obras/{criterio}/lista")
    suspend fun getListaObrasCatalogo(@Path("criterio") criterio: String): List<ElementoCatalogo>

    @GET("autores/{id}")
    suspend fun getObrasDeAutor(@Path("id") id: Int): RespuestaCatalogoConObras

    @GET("obras/{criterio}/{id}")
    suspend fun getObrasDeCatalogo(
        @Path("criterio") criterio: String,
        @Path("id") id: Int
    ): List<Obra>
}

object RetrofitClient {
    // 💡 AQUÍ COLOCAS TU IP ASIGNADA POR TAILSCALE (Ej: "100.80.90.100")
    private const val BASE_URL = "http://100.104.224.61:3000/"

    val apiService: ApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }

    fun obtenerUrlAbsolutaPdf(urlRelativa: String): String {
        // 1. Reemplazamos las barras invertidas de Windows por barras normales de URL
        var urlLimpia = urlRelativa.replace("\\", "/")

        // 2. Si la ruta comienza con "src/", removemos esos primeros 4 caracteres
        if (urlLimpia.startsWith("src/", ignoreCase = true)) {
            urlLimpia = urlLimpia.substring(4)
        }

        // 3. Unimos la IP de Tailscale con la ruta corregida (ej: http://100.X.X.X:3000/upload/archivo.pdf)
        return BASE_URL + urlLimpia
    }
}
