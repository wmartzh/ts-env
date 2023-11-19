import tsEnv from '../index'

describe('Main Function',()=>{
  it("Should load the environment variables from yaml file",()=>{
    tsEnv({path: './src/test/test.yaml',});
    expect(process.env.person).toBeDefined();
  })

  it("Should load the environment variables from json file",()=>{
    tsEnv({path: './src/test/test.json',type:'JSON'});
    expect(process.env.string).toBeDefined();
    expect(process.env.string).toBe("Hello, World!")
  })

  it("Should load the environment variables from toml file",()=>{
    tsEnv({path: './src/test/test.toml',type:'TOML'});
    expect(process.env.string).toBeDefined();
    expect(process.env.string).toBe("Hello, World!")
  })
 
})