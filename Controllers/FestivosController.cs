using Microsoft.AspNetCore.Mvc;
using ApiFestivos.Models;

namespace ApiFestivos.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class FestivosController : ControllerBase
	{
		private static List<Festivo> festivos = new List<Festivo>
		{
			new Festivo { Id = 1, Nombre = "Año nuevo", Dia = 1, Mes = 1 },
			new Festivo { Id = 2, Nombre = "Día del Trabajo", Dia = 1, Mes = 5 },
			new Festivo { Id = 3, Nombre = "Independencia Colombia", Dia = 20, Mes = 7 }
		};

		[HttpGet]
		public ActionResult<List<Festivo>> Get() => festivos;

		[HttpGet("{id}")]
		public ActionResult<Festivo> Get(int id)
		{
			var festivo = festivos.FirstOrDefault(f => f.Id == id);
			return festivo is null ? NotFound() : festivo;
		}

		[HttpPost]
		public ActionResult Add(Festivo nuevoFestivo)
		{
			nuevoFestivo.Id = festivos.Max(f => f.Id) + 1;
			festivos.Add(nuevoFestivo);
			return Ok(nuevoFestivo);
		}

		[HttpPut("{id}")]
		public ActionResult Update(int id, Festivo actualizado)
		{
			var festivo = festivos.FirstOrDefault(f => f.Id == id);
			if (festivo is null) return NotFound();

			festivo.Nombre = actualizado.Nombre;
			festivo.Dia = actualizado.Dia;
			festivo.Mes = actualizado.Mes;

			return Ok(festivo);
		}

		[HttpDelete("{id}")]
		public ActionResult Delete(int id)
		{
			var festivo = festivos.FirstOrDefault(f => f.Id == id);
			if (festivo is null) return NotFound();

			festivos.Remove(festivo);
			return NoContent();
		}
	}
}
