import 'package:flutter/material.dart';
import 'package:muto_system/views/testView.dart';
import '../connections/credentialConnection.dart';

class Credentialview extends StatefulWidget {
  @override
  State<Credentialview> createState() => _CredentialviewState();
}

class _CredentialviewState extends State<Credentialview> {
  final TextEditingController name = TextEditingController();
  final TextEditingController email = TextEditingController();
  final TextEditingController password = TextEditingController();
  final TextEditingController cod = TextEditingController();

  void showSnack(String message, bool success) {
    final snackBar = SnackBar(
      content: Text(message),
      backgroundColor: success ? Colors.green : Colors.red,
    );
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Cadastro')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: name,
              decoration: InputDecoration(labelText: 'Nome'),
            ),
            TextField(
              controller: email,
              decoration: InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: password,
              decoration: InputDecoration(labelText: 'Senha'),
              obscureText: true,
            ),
            TextField(
              controller: cod,
              decoration: InputDecoration(labelText: 'Código (para administradores)'),
              obscureText: true,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () async {
                try {
                  if (cod.text.isEmpty) {
                    final userSignUpAnswer = await UserSignUp(name.text, email.text, password.text);
                    if (userSignUpAnswer == 200) {
                      showSnack('Usuário cadastrado com sucesso!', true);
                    } else {
                      showSnack('Erro ao cadastrar usuário.', false);
                    }
                  } else {
                    final admSignUpAnswer = await AdmSignUp(name.text, email.text, password.text, cod.text);
                    if (admSignUpAnswer == 200) {
                      showSnack('Administrador cadastrado com sucesso!', true);
                    } else {
                      showSnack('Erro ao cadastrar administrador.', false);
                    }
                  }
                } catch (e) {
                  showSnack('Erro inesperado: $e', false);
                }
              },
              child: Text("SignUp"),
            ),
            SizedBox(height: 10),
            
            ElevatedButton(
              onPressed: () async {
                try {
                  final userLoginAnswer = await UserLogin(name.text, email.text, password.text);
                  if (userLoginAnswer == 200) {
                    showSnack('Usuário fez login com sucesso', true);
                    Navigator.push(context, MaterialPageRoute(builder: (context) => PageTest()));
                  }
                  if(userLoginAnswer == 500){
                    showSnack('Erro no login do usuário', false);
                  }
                }
                catch (e) {
                  showSnack('Erro inesperado: $e', false);
                }}, child: Text("Usuário Login"),),

              ElevatedButton(
              onPressed: () async {
                try {
                  final admLoginAnswer = await AdmLogin(name.text, email.text, password.text);
                  if (admLoginAnswer == 200) {
                    showSnack('Administrador fez login com sucesso', true);
                    Navigator.push(context, MaterialPageRoute(builder: (context) => PageTest()));
                  }
                  if(admLoginAnswer == 500){
                    showSnack('Erro no login do administrador', false);
                  }
                }
                catch (e) {
                  showSnack('Erro inesperado: $e', false);
                }}, child: Text("Administrador Login"),)

          ],
        ),
      ),
    );
  }
}
