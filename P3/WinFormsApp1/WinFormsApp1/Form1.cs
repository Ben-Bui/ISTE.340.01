namespace WinFormsApp1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            label1.Text = "you clicked on the button";
        }

        private void button1_MouseLeave(object sender, EventArgs e)
        {
            label1.Text = "start";
        }
    }
}
