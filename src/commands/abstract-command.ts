export default abstract class AbstractCommand {
    abstract execute(): Promise<unknown>;
}
