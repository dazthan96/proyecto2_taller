package com.example.myapplication

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.myapplication.ElementoCatalogo
import com.example.myapplication.Obra
import com.example.myapplication.RetrofitClient
import kotlinx.coroutines.launch

// --- PANTALLA 1: MENÚ DE CRITERIOS ---
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PantallaBusquedaCriterios(onCriterioSeleccionado: (String) -> Unit) {
    Scaffold(
        topBar = { TopAppBar(title = { Text("Biblioteca Móvil de Lectura", fontWeight = FontWeight.Bold) }) }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(24.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Selecciona un criterio de exploración:",
                fontSize = 16.sp,
                modifier = Modifier.padding(bottom = 24.dp)
            )

            val criterios = listOf("autor", "categoria", "region", "departamento", "cultura")
            criterios.forEach { criterio ->
                Button(
                    onClick = { onCriterioSeleccionado(criterio) },
                    modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp)
                ) {
                    Text(criterio.uppercase(), fontSize = 15.sp, fontWeight = FontWeight.SemiBold)
                }
            }
        }
    }
}


// --- PANTALLA 2: LISTADO DE SUB-ELEMENTOS ---
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PantallaListaElementos(criterio: String, onElementoSeleccionado: (Int) -> Unit, onVolver: () -> Unit) {
    var elementos by remember { mutableStateOf<List<ElementoCatalogo>>(emptyList()) }
    var cargando by remember { mutableStateOf(true) }
    var errorMensaje by remember { mutableStateOf<String?>(null) }
    val scope = rememberCoroutineScope()

    val cargarDatos = {
        cargando = true
        errorMensaje = null
        scope.launch {
            try {
                elementos = if (criterio == "autor") {
                    RetrofitClient.apiService.getListaAutores()
                } else {
                    RetrofitClient.apiService.getListaObrasCatalogo(criterio)
                }
            } catch (e: Exception) {
                e.printStackTrace()
                errorMensaje = e.localizedMessage ?: "Error de conexión con el backend."
            }
            cargando = false
        }
    }

    LaunchedEffect(criterio) {
        cargarDatos()
    }

    Scaffold(
        topBar = { TopAppBar(title = { Text("Explorar: ${criterio.uppercase()}") }) }
    ) { paddingValues ->
        Box(modifier = Modifier.padding(paddingValues).fillMaxSize().padding(16.dp)) {
            Column {
                TextButton(onClick = onVolver) { Text("← Volver al menú principal") }

                if (cargando) {
                    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        CircularProgressIndicator()
                    }
                } else if (errorMensaje != null) {
                    Column(
                        modifier = Modifier.fillMaxSize(),
                        verticalArrangement = Arrangement.Center,
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(" Error de Carga", fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.error, fontSize = 18.sp)
                        Text(text = errorMensaje!!, textAlign = TextAlign.Center, modifier = Modifier.padding(16.dp))
                        Button(onClick = { cargarDatos() }) { Text("Reintentar Conexión") }
                    }
                } else {
                    LazyColumn {
                        items(elementos) { elemento ->
                            Card(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 6.dp)
                                    .clickable { onElementoSeleccionado(elemento.id) },
                                elevation = CardDefaults.cardElevation(2.dp)
                            ) {
                                Text(
                                    text = elemento.displayNombre,
                                    modifier = Modifier.padding(16.dp),
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Medium
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}


// --- PANTALLA 3: LISTADO DE OBRAS Y CONEXIÓN AL PDF ---
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PantallaObrasResultados(criterio: String, id: Int, onVolver: () -> Unit) {
    var obras by remember { mutableStateOf<List<Obra>>(emptyList()) }
    var cargando by remember { mutableStateOf(true) }
    var errorMensaje by remember { mutableStateOf<String?>(null) }
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    val cargarObras = {
        cargando = true
        errorMensaje = null
        scope.launch {
            try {
                // 🚀 Asignamos la lista a 'obras' de manera diferenciada según el caso
                if (criterio == "autor") {
                    // Caso Autor: Es un objeto, extraemos su propiedad interna .obras
                    val respuestaObjeto = RetrofitClient.apiService.getObrasDeAutor(id)
                    obras = respuestaObjeto.obras ?: emptyList()
                } else {
                    // Caso Catálogos: Es una lista directa, la asignamos por completo
                    val respuestaLista = RetrofitClient.apiService.getObrasDeCatalogo(criterio, id)
                    obras = respuestaLista
                }
            } catch (e: Exception) {
                e.printStackTrace()
                errorMensaje = e.localizedMessage ?: "Error al procesar las obras desde el servidor."
            }
            cargando = false
        }
    }


    LaunchedEffect(id) {
        scope.launch {
            try {
                // Evaluamos de forma inteligente qué estructura de datos viene del servidor
                if (criterio == "autor") {
                    // Estructura de Objeto: Extraemos el arreglo interno .obras
                    val respuestaObjeto = RetrofitClient.apiService.getObrasDeAutor(id)
                    obras = respuestaObjeto.obras ?: emptyList()
                } else {
                    // Estructura de Arreglo Directo: Asignamos la respuesta tal cual llega
                    val respuestaLista = RetrofitClient.apiService.getObrasDeCatalogo(criterio, id)
                    obras = respuestaLista
                }
            } catch (e: Exception) {
                e.printStackTrace()
                errorMensaje = e.localizedMessage ?: "Error al procesar las obras desde el servidor."
            }
            cargando = false
        }
    }


    Scaffold(
        topBar = { TopAppBar(title = { Text("Obras Encontradas") }) }
    ) { paddingValues ->
        Box(modifier = Modifier.padding(paddingValues).fillMaxSize().padding(16.dp)) {
            Column {
                TextButton(onClick = onVolver) { Text("← Cambiar de selección") }

                if (cargando) {
                    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        CircularProgressIndicator()
                    }
                } else if (errorMensaje != null) {
                    Column(
                        modifier = Modifier.fillMaxSize(),
                        verticalArrangement = Arrangement.Center,
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text("⚠️ Error de Datos", fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.error, fontSize = 18.sp)
                        Text(text = errorMensaje!!, textAlign = TextAlign.Center, modifier = Modifier.padding(16.dp))
                        Button(onClick = { cargarObras() }) { Text("Reintentar Carga") }
                    }
                } else {
                    if (obras.isEmpty()) {
                        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                            Text("Este elemento no cuenta con obras registradas aún.", color = MaterialTheme.colorScheme.outline)
                        }
                    } else {
                        LazyColumn {
                            items(obras) { obra ->
                                Card(
                                    modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
                                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                                ) {
                                    Column(modifier = Modifier.padding(16.dp)) {
                                        Text(obra.titulo, fontSize = 18.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                                        Text(obra.sinopsis, fontSize = 14.sp, modifier = Modifier.padding(vertical = 8.dp), maxLines = 4)

                                        Button(
                                            onClick = { abrirNavegadorPdf(context, obra.url_pdf) },
                                            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.secondary),
                                            modifier = Modifier.fillMaxWidth()
                                        ) {
                                            Text("📖 LEER DOCUMENTO PDF")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


fun abrirNavegadorPdf(context: Context, urlRelativa: String) {
    val urlCompleta = RetrofitClient.obtenerUrlAbsolutaPdf(urlRelativa)
    try {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(urlCompleta)).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
        context.startActivity(intent)
    } catch (e: Exception) {
        e.printStackTrace()
    }
}
