namespace ApiFestivos.Models
{
	public class Festivo
	{
		public int Id { get; set; }
		public string Nombre { get; set; } = string.Empty;
		public int Dia { get; set; }
		public int Mes { get; set; }
	}
}
