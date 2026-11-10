package com.example.myapplication


import androidx.compose.runtime.Composable
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.myapplication.PantallaBusquedaCriterios
import com.example.myapplication.PantallaListaElementos
import com.example.myapplication.PantallaObrasResultados

// Definición de las rutas del sistema móvil
sealed class Ruta(val rutaStr: String) {
    object MenuCriterios : Ruta("menu_criterios")
    object ListaElementos : Ruta("lista_elementos/{criterio}") {
        fun crearRuta(criterio: String) = "lista_elementos/$criterio"
    }
    object ObrasResultados : Ruta("obras_resultados/{criterio}/{id}") {
        fun crearRuta(criterio: String, id: Int) = "obras_resultados/$criterio/$id"
    }
}

@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = Ruta.MenuCriterios.rutaStr) {

        // Pantalla 1: Los 5 botones de criterios de búsqueda
        composable(Ruta.MenuCriterios.rutaStr) {
            PantallaBusquedaCriterios(
                onCriterioSeleccionado = { criterio ->
                    navController.navigate(Ruta.ListaElementos.crearRuta(criterio))
                }
            )
        }

        // Pantalla 2: Listado de elementos según el criterio (Ej: Lista de Autores)
        composable(
            route = Ruta.ListaElementos.rutaStr,
            arguments = listOf(navArgument("criterio") { type = NavType.StringType })
        ) { backStackEntry ->
            val criterio = backStackEntry.arguments?.getString("criterio") ?: "autor"
            PantallaListaElementos(
                criterio = criterio,
                onElementoSeleccionado = { id ->
                    navController.navigate(Ruta.ObrasResultados.crearRuta(criterio, id))
                },
                onVolver = { navController.popBackStack() }
            )
        }

        // Pantalla 3: Lista de obras de ese elemento con botón para abrir PDF
        composable(
            route = Ruta.ObrasResultados.rutaStr,
            arguments = listOf(
                navArgument("criterio") { type = NavType.StringType },
                navArgument("id") { type = NavType.IntType }
            )
        ) { backStackEntry ->
            val criterio = backStackEntry.arguments?.getString("criterio") ?: "autor"
            val id = backStackEntry.arguments?.getInt("id") ?: 0
            PantallaObrasResultados(
                criterio = criterio,
                id = id,
                onVolver = { navController.popBackStack() }
            )
        }
    }
}
